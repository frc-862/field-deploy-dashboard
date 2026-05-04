import express from 'express';
import { spawn } from 'node:child_process';
import { createWriteStream, mkdirSync } from 'node:fs';
import { join } from 'node:path';

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
};

const stopRecording = () => {
    if (!recordingOn) return;
    console.log('======== Ending Recording ========');
    cleanup();
    recordingOn = false;
};

// Kills the recording stream and then the ffmpeg process
export const cleanup = () => {
    try {
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
        console.log('-- Added client, total clients:', clients.size);

        // Helper function to disconnect the client
        const disconnect = (type = 'unknown') => {
            if (clients.delete(res)) console.log(`-- Removed client by ${type}, total clients:`, clients.size);
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

export default router;
