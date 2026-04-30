import express from 'express';
import cameraRouter from './camera.js';
import { cleanup } from './camera.js';

const app = express();

// Include the camera router with the main express app
app.use('/camera', cameraRouter);

// When the server is closed, cleanup the ffmpeg process
app.on('close', cleanup);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000 ✅');

  // This can only run on MacOS since it will run with the Mac Mini-- built wiht only mac support in mind
  if (process.platform !== 'darwin') {
    console.log('Must be run on a Mac ❌');
    process.exit(1);
  }
});