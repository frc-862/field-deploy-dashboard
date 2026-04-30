import express from 'express';
import { spawn } from 'node:child_process';

const router = express.Router();

// Function to return parameters for ffmpeg command
const getParams = () => {
  return [
    '-f', 'avfoundation', // Use avfoundation for macOS
    '-framerate', '30', // Frame rate to use from the input device
    '-pixel_format', 'uyvy422', // Pixel format to use from the input device
    '-video_size', '1280x720', // Video size to use from the input device
    '-i', '0:none', // Input device to use
    '-vf', 'fps=15', // Frame rate to use for the output
    '-q:v', '15', // Quality (how much compression to use) of the output
    '-f', 'mpjpeg', // Output format
    'pipe:1' // Output to pipe 1 (stdout)
  ]
} 

// Execute the ffmpeg command with the parameters
const ffmpegProcess = spawn('ffmpeg', getParams())

export const cleanup = () => {
    if (!ffmpegProcess.killed) {
        ffmpegProcess.kill('SIGTERM');
    }
}

// Route to get a snapshot from the camera
router.get('/stream', (req, res) => {
    try {
        // Defines how we will send the data to the client
        res.writeHead(200, {
          "Content-Type": "multipart/x-mixed-replace; boundary=ffmpeg", 
        });
        
        // Pipe the stdout of the ffmpeg process directly to the client because it's already in the correct format
        ffmpegProcess.stdout.pipe(res);

        // Logging for errors and individual frame data
        ffmpegProcess.stderr.on('data', (chunk) => {
          console.error(chunk.toString());
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error getting stream'});
    }
});

export default router;