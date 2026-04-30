import express from 'express';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const getParams = (device) => {
  return [
    '-f', 'avfoundation',
    '-framerate', '30',
    '-i', `${device}:none`,
    '-frames:v', '1',
    '-f', 'mjpeg',
    '-q:v', '2',
    'pipe:1'
  ]
}

const router = express.Router();

router.get('/snapshot', async(req, res) => {
    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync(
        'ffmpeg', 
        getParams(req.query.device || '0'), 
        { encoding: 'buffer', maxBuffer: 1024 * 1024 * 10 });
    
    res.type('image/jpeg');
    res.send(Buffer.from(stdout));
});

export default router;