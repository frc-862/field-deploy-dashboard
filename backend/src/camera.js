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
        'fps=15', // Frame rate to use for the output, also scale down to 360p
        '-q:v',
        '15', // Quality (how much compression to use) of the output
        '-f',
        'mpjpeg', // Output format
        'pipe:1', // Output to pipe 1 (stdout)

        // output 2 for saved mp4 recording
        '-vf', 
        'fps=30',        // keep full 30fps
        '-vcodec', 
        'libx264',   // H.264 encoding
        '-preset', 
        'fast',      // encoding speed vs compression tradeoff
        '-crf', 
        '18',           // quality - 18 is near-lossless
        '-movflags', 
        'frag_keyframe+empty_moov', // makes MP4 streamable/writable to a pipe
        '-f', 
        'mp4',
        'pipe:3',               // write to file descriptor 3
    ];
};

// Execute the ffmpeg command with the parameters
let ffmpegProcess = null;
let ffmpegOn = false;
let clients = new Set();
let recordingStream = null; // stream to write the mp4 recording to

const startFFmpeg = () => {
    if (ffmpegOn) return;
    console.log('======== Starting ffmpeg ========');

    mkdirSync('./recordings', { recursive: true }); // make the folder, recursive true means there's no error if the folder already exists
    const filename = `recording_${Date.now()}.mp4`;
    const filepath = join('./recordings', filename);
    recordingStream = createWriteStream(filepath);
    console.log(`Recording to: ${filepath}`);

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

    // mp4 chunks come in through pipe 3 and are written to the recording stream which is piped to a file in the recordings directory
    ffmpegProcess.stdio[3].on('data', (chunk) => {
        recordingStream.write(chunk); // Write the chunk to the recording stream for the mp4
    });

    ffmpegProcess.stdio[3].on('end', () => {
        recordingStream.end(); // End the recording stream for the mp4 when ffmpeg finishes to prevent video corrupting or ending early
        console.log(`Finished recording: ${filepath}`);
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

    ffmpegOn = true;
};

const stopFFmpeg = () => {
    if (!ffmpegOn) return;
    console.log('======== Stopping ffmpeg ========');
    cleanup();
    ffmpegOn = false;
};

// Kills the ffmpeg process
export const cleanup = () => {
    try {
        if (ffmpegProcess && !ffmpegProcess.killed) {
            // Requests for the process (ffmpeg) to be killed
            ffmpegProcess.kill('SIGTERM');
        }
    } catch (error) {
        console.error(error);
    }
};

// Route to get a snapshot from the camera
router.get('/stream', (req, res) => {
    try {
        // Do this before anything can have an opprotunity to get sent to client
        // Defines how we will send the data to the client
        res.writeHead(200, {
            'Content-Type': 'multipart/x-mixed-replace; boundary=ffmpeg',
            'Cache-Control': 'no-store', // Don't cache each frame or the response
        });
        res.flushHeaders();

        // Start the ffmpeg process if this is the first client being added
        if (clients.size === 0) {
            startFFmpeg();
        }

        // Add the client to the set of clients
        clients.add(res);
        console.log('Added client, total clients:', clients.size);

        // Helper function to disconnect the client
        const disconnect = (type = 'unknown') => {
            if (clients.delete(res)) console.log(`Removed client by ${type}, total clients:`, clients.size);

            if (clients.size === 0) {
                stopFFmpeg();
            }
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

export default router;
