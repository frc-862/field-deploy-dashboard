import express from 'express';
import { spawn } from 'node:child_process';

const router = express.Router();

// Function to return parameters for ffmpeg command
const getParams = () => {
  return [
    '-f', 'avfoundation',
    '-framerate', '30',
    '-i', '0:none',
    '-frames:v', '10',
    '-f', 'uyvy422',
    '-q:v', '5',
    'pipe:1'
  ]
} 

// Route to get a snapshot from the camera
router.get('/snapshot', (req, res) => {
    try {
        // Execute the ffmpeg command with the parameters
        const process = spawn('ffmpeg', getParams())

        // Defines how we will send the data to the client
        res.writeHead(200, {
          "Content-Type": "multipart/x-mixed-replace; boundary=frame", 
          "Connection": "keep-alive", 
          "Cache-Control": "no-cache"
        });
        
        process.stdout.on('data', (chunk) => {
          res.write("--frame\r\n");
          res.write("Content-Type: image/jpeg\r\n\r\n");

          res.write(chunk);
          res.write("\r\n");
        });

        process.stderr.on('data', (chunk) => {
          console.error(chunk.toString());
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error getting snapshot'});
    }
});

export default router;