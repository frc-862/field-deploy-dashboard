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
let ffmpegProcess = null;
let ffmpegOn = false;
let clients = new Set();

const startFFmpeg = () => {
  if (ffmpegOn) return;
  console.log('======== Starting ffmpeg ========');
  ffmpegProcess = spawn('ffmpeg', getParams());

  // Pipe the stdout of the ffmpeg process directly to the client because it's already in the correct format
  ffmpegProcess.stdout.on('data', (chunk) => {
    for (const res of clients) {
      try {
        // Write the chunk to the client
        res.write(chunk);
      } catch (error) {
        console.error(error);
      }
    }
  })

  let frameCount = 0;
  const frameLogFrequency = 100;
  // Logging for errors and individual frame data
  ffmpegProcess.stderr.on('data', (chunk) => {
    const data = chunk.toString();

    // Log all errors
    if (data.includes('error')) {
      console.error(data);
    }

    // Log frames by the frequency
    if (data.includes('frame')) {
      frameCount++;
      if (frameCount % frameLogFrequency === 0) {
        console.log(`${data}\n`);
      }
    }
  });
  ffmpegOn = true;
}

const stopFFmpeg = () => {
  if (!ffmpegOn) return;
  console.log('======== Stopping ffmpeg ========');
  cleanup();
  ffmpegOn = false;
}

// Kills the ffmpeg process
export const cleanup = () => {
    if (!ffmpegProcess.killed) {
        ffmpegProcess.kill('SIGTERM');
    }
}

// Route to get a snapshot from the camera
router.get('/stream', (req, res) => {
    try {
        if (clients.size === 0) {
          startFFmpeg();
        }

        clients.add(res);
        console.log('Added client, total clients:', clients.size)

        // Defines how we will send the data to the client
        res.writeHead(200, {
          "Content-Type": "multipart/x-mixed-replace; boundary=ffmpeg", 
        });

        req.on('close', () => {
          clients.delete(res);
          console.log('Removed client, total clients:', clients.size)
          if (clients.size === 0) {
            stopFFmpeg();
          }
        });

        req.on('aborted', () => {
          clients.delete(res);
          console.log('Removed client by aborted, total clients:', clients.size)
          if (clients.size === 0) {
            stopFFmpeg();
          }
        });

        req.on('error', (_) => {
          clients.delete(res);
          console.log('Removed client by error, total clients:', clients.size)
          if (clients.size === 0) {
            stopFFmpeg();
          }
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({message: 'Error getting stream'});
    }
});

export default router;