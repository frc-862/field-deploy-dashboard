import express from 'express';
import { spawn } from 'node:child_process';
import { createWriteStream, mkdirSync, readdirSync, createReadStream, statSync } from 'node:fs';
import { join } from 'node:path';
import { broadcast } from './ws.js';

const router = express.Router();

// Function to return parameters for ffmpeg command
const getParams = () => {
    return [
        '-f',
        'avfoundation', // Use avfoundation for macOS
        '-framerate',
        '30', // Frame rate to use from the input device
        '-pixel_format',
        'uyvy422', // Pixel format to use from the input device
        '-video_size',
        '1920x1080', // Video size to use from the input device
        '-i',
        '0:none', // Input device to use

        // output 1 for low quality stream
        '-vf',
        'fps=15, scale=iw/2:ih/2', // Frame rate to use for the output and half the resolution
        '-q:v',
        '15', // Quality (how much compression to use) of the output
        '-f',
        'mpjpeg', // Output format
        'pipe:1', // Output to pipe 1 (stdout)

        // output 2 for saved mp4 recording
        '-vf',
        'fps=30', // keep full 30fps
        '-vcodec',
        'libx264', // H.264 encoding
        '-preset',
        'fast', // encoding speed vs compression tradeoff
        '-crf',
        '18', // quality - 18 is near-lossless
        '-movflags',
        'frag_keyframe+empty_moov', // makes MP4 streamable/writable to a pipe
        '-f',
        'mp4',
        'pipe:3', // write to file descriptor 3
    ];
};

let recordingOn = false;
let clients = new Set();

let ffmpegProcess = null; // The process that runs the ffmpeg command
let recordingStream = null; // stream to write the mp4 recording to

const startRecording = () => {
    if (recordingOn) return;
    console.log('======== Starting Recording ========');

    // Creates the recordings directory if it doesn't exist
    mkdirSync('../recordings', { recursive: true });

    // Creates the filename for the recording
    const now = new Date();
    const filename = `recording_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.mp4`;
    const filepath = join('../recordings', filename);

    // Creates a stream into a file (which is at the path defined above)
    recordingStream = createWriteStream(filepath);
    console.log(`-- Recording to: ${filepath}`);

    ffmpegProcess = spawn('ffmpeg', getParams(), {
        stdio: ['ignore', 'pipe', 'pipe', 'pipe'], // ignore stdin, pipe stdout and stderr, 3 is custom pipe for mp4
    });

    // Pipe the stdout of the ffmpeg process directly to the client because it's already in the correct format
    ffmpegProcess.stdio[1].on('data', (chunk) => {
        for (const res of clients) {
            try {
                // Write the chunk to the client
                res.write(chunk);
            } catch (error) {
                console.error(error);
            }
        }
    });

    // Pipe data from pipe 3 to the recording stream
    ffmpegProcess.stdio[3].on('data', (chunk) => {
        // Write the chunk to the recording stream which leads to the mp4 file
        recordingStream.write(chunk);
    });

    // Logging for errors and individual frame data
    ffmpegProcess.stderr.on('data', (chunk) => {
        const data = chunk.toString();

        // Log all errors
        if (data.includes('error')) {
            console.error(data);
        }

        // Log frames by the frequency
        if (data.includes('frame')) {
            // TODO: Create some logging system that doesn't log directly to the terminal
        }
    });

    recordingOn = true;

    broadcast('recordingStarted');
};

export const stopRecording = () => {
    if (!recordingOn) return;
    console.log('======== Ending Recording ========');
    cameraCleanup();
    recordingOn = false;
    broadcast('recordingStopped');
};

// Kills the recording stream and then the ffmpeg process
export const cameraCleanup = () => {
    try {
        console.log('Starting camera.js cleanup...');
        if (recordingStream && !recordingStream.writableEnded) {
            // Ends the recording stream
            recordingStream.end();
            console.log('-- Recording stream ended');
        }

        if (ffmpegProcess && !ffmpegProcess.killed) {
            // Requests for the process (ffmpeg) to be killed
            ffmpegProcess.kill('SIGTERM');
            console.log('-- FFmpeg process killed');
        }
        console.log('camera.js cleanup complete ✅');
    } catch (error) {
        console.error(error);
    }
};

// Route to get a snapshot from the camera
router.get('/stream', (req, res) => {
    try {
        if (!recordingOn) {
            return res.status(400).json({ message: 'Recording is not on' });
        }

        // Do this before anything can have an opprotunity to get sent to client
        // Defines how we will send the data to the client
        res.writeHead(200, {
            'Content-Type': 'multipart/x-mixed-replace; boundary=ffmpeg',
            'Cache-Control': 'no-store', // Don't cache each frame or the response
        });
        res.flushHeaders();

        // Add the client to the set of clients
        clients.add(res);
        console.log(`-- ${req.ip} joined stream, total clients: ${clients.size}`);

        // Helper function to disconnect the client
        const disconnect = (type = 'unknown') => {
            if (clients.delete(res)) console.log(`-- ${req.ip} left stream by ${type}, total clients:`, clients.size);
        };

        // Clean up the client when the request is closed, aborted, or an error occurs
        req.on('close', () => disconnect('close'));
        req.on('aborted', () => disconnect('aborted'));
        req.on('error', () => disconnect('error'));
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error getting stream' });
    }
});

router.post('/start', (req, res) => {
    try {
        startRecording();
        res.status(200).json({ message: 'Recording started' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error starting recording', error: error.message });
    }
});

router.post('/stop', (req, res) => {
    try {
        stopRecording();
        res.status(200).json({ message: 'Recording stopped' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error stopping recording', error: error.message });
    }
});

router.get('/recording/status', (req, res) => {
    try {
        res.status(200).json({
            recordingOn,
            message: recordingOn ? 'Recording is on' : 'Recording is off',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting recording status', error: error.message });
    }
});

router.get('/recording/list', (req, res) => {
    try {
        // Gets the files in the recordings directory
        const recordings = readdirSync('../recordings');

        res.status(200).json({ recordings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting recording list. Does the recordings directory exist?' });
    }
});

router.get('/recording/:filename/download', (req, res) => {
    try {
        const { filename } = req.params;
        const filepath = join('../recordings', filename);
        const file = createReadStream(filepath);

        // Sets the headers for the response to download the file
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'video/mp4'); // Specify the video is an mp4

        // Pipes the file directly to the client
        file.pipe(res);

        // Logs the download to the console
        file.on('end', () => {
            console.log(`-- Downloaded ${filename} to ${req.ip}`);
        });

        // Logs/catches the error to the console
        file.on('error', (error) => {
            console.error(error);
            res.status(500).json({ message: 'Error downloading recording file', error: error.message });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error downloading recording file', error: error.message });
    }
});

// Not true streaming, instead, we send over chunks of the video file to the client
// Each chunk gets sent over as a partial response to the client
// The size of each chunk is decided by the range header from the request
router.get('/recording/:filename/stream', (req, res) => {
    try {
        const { filename } = req.params;
        const filepath = join('../recordings', filename);

        // Gets the file stats to get the file size
        const fileStats = statSync(filepath);
        const fileSize = fileStats.size;

        // Gets the range header from the request
        const range = req.headers.range;

        if (range) {
            // Gets the start and end of the chunk we want to send from the range header
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            // Gets the size of the chunk we want to send, then read that chunk from the file
            const chunkSize = end - start + 1;
            const fileStream = createReadStream(filepath, { start, end });

            // Sets the headers for the response to send the chunk
            // Tells the client the information that it needs to know about what we are sending over
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize.toString(),
                'Content-Type': 'video/mp4',
            };

            // Writes the headers to the response
            res.writeHead(206, head);

            // Pipes the chunk to the client
            fileStream.pipe(res);

            // Logs the stream to the console
            fileStream.on('end', () => {
                console.log(`-- Streamed ${filename} (${start}-${end}) to ${req.ip}`);
            });

            // Logs/catches the error to the console
            fileStream.on('error', (error) => {
                console.error(error);
                res.status(500).json({ message: 'Error streaming recording file', error: error.message });
            });
        } else {
            // If no range header is provided, we send the entire file to the client
            const head = {
                'Content-Disposition': `inline; filename="${filename}"`,
                'Content-Type': 'video/mp4',
                'Accept-Ranges': 'bytes',
                'Content-Length': fileSize,
            };

            // Writes the headers to the response
            res.writeHead(200, head);

            // Pipes the entire file to the client
            const stream = createReadStream(filepath);
            stream.pipe(res);

            // Logs the stream to the console
            stream.on('end', () => {
                console.log(`-- Streamed full file ${filename} to ${req.ip}`);
            });

            // Logs/catches the error to the console
            stream.on('error', (error) => {
                console.error(error);
                res.status(500).json({ message: 'Error streaming recording file', error: error.message });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error streaming recording file', error: error.message });
    }
});

export default router;
