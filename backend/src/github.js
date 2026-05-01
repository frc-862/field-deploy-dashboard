import express from 'express';
import { spawn } from 'node:child_process';
import path from 'node:path';

const router = express.Router();

router.get('/clone/:repo', async (req, res) => {
    try {
        // Get the repo name directly from the URL
        const repo = req.params.repo;
        const repoPath = path.join('../', 'repos', repo);

        // Create the full git url using the repo name
        const repoUrl = `https://github.com/frc-862/${repo}.git`;

        // Run the git clone command using the url and clone it into the repos directory
        const gitClone = spawn('git', ['clone', repoUrl, repoPath]);

        // Attach the real result of the command to the response
        gitClone.on('close', (code) => {
            if (code === 0) {
                return res
                    .status(200)
                    .json({ message: 'Repository cloned successfully', data: { repoPath, repoName: repo } });
            } else {
                return res.status(500).json({ message: 'Error cloning repository', error: 'Git clone command failed' });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error cloning repository', error: error.message });
    }
});

export default router;
