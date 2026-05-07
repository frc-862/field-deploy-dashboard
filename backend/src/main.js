import express from 'express';
import cameraRouter, { cameraCleanup } from './camera.js';
import githubRouter from './github.js';
import wpilibRouter from './wpilib.js';

const app = express();

// Include the camera router with the main express app
app.use('/camera', cameraRouter);
app.use('/github', githubRouter);
app.use('/wpilib', wpilibRouter);

// Start the server on port 3000
app.listen(3000, () => {
    console.log(
        '=================================== \n Server is running on port 3000 ✅\n=================================== \n'
    );

    // This can only run on MacOS since it will run with the Mac Mini-- built wiht only mac support in mind
    if (process.platform !== 'darwin') {
        console.log('Must be run on a Mac ❌');
        process.exit(1);
    }
});

const gracefulShutdown = (signal) => {
    console.log('\n\n=============================================== \n');
    console.log(`Received ${signal}, shutting down gracefully...\n`);
    // Cleanup the ffmpeg process
    cameraCleanup();

    console.log('\n=============================================== \n');
    process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Comment to test prettier
