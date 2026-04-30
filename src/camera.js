import express from 'express';
// Library to help execute terminal commands in their own process
import { execFile } from 'node:child_process';
// Library that turns old callback-based functions into promises
import { promisify } from 'node:util';

const router = express.Router();

// Function to return parameters for ffmpeg command
const getParams = (device = '0') => {
  return [
    '-f', 'avfoundation', // Input format (AVFoundation for macOS)
    '-framerate', '30', // The frame rate request from camera encoder
    '-i', `${device}:none`, // The device to use for input (0 is the first available video device)
    '-frames:v', '1', // The number of frames to capture
    '-f', 'mjpeg', // Output format (MJPEG)
    '-q:v', '2', // The quality of the output (lower value = higher quality)
    'pipe:1' // Write the output to stdout
  ]
} 

// Promisify the execFile function to use with async/await
const execFileAsync = promisify(execFile);

// Route to get a snapshot from the camera
router.get('/snapshot', async (req, res) => {
    try {
        // Execute the ffmpeg command with the parameters
        const { stdout } = await execFileAsync(
            'ffmpeg', 
            getParams(0), // Get the parameters for the ffmpeg command
            { encoding: 'buffer', maxBuffer: 1024 * 1024 * 10 }); // Set the encoding to buffer and the max buffer to 10MB
        
        // Set the content type for the client will expect to receive to be image/jpeg
        res.type('image/jpeg');

        // Send the buffer output of the ffmpeg command
        res.send(stdout);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error getting snapshot'});
    }
});

export default router;