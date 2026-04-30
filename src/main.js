import express from 'express';

import cameraRouter from './camera.js';

const app = express();

app.use('/camera', cameraRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000 ✅');
  
  if (process.platform !== 'darwin') {
    console.log('Must be run on a Mac ❌');
    process.exit(1);
  }
});