import express from 'express';
import path from 'node:path';
const router = express.Router();
import fs from 'node:fs';
import { runCommand, validateInput } from './utils.js';
import { broadcast } from './ws.js';

router.post('/build/:repo', async (req, res) => {
    try {
        const repo = req.params.repo;

        if (!validateInput(repo))
            return res
                .status(400)
                .json({ message: 'Invalid repository name', error: 'Repository name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);

        if (!fs.existsSync(repoPath)) {
            return res.status(404).json({ message: 'Repository not found', error: 'Repository does not exist' });
        }

        const result = await runCommand('sh', ['gradlew', 'build'], {
            cwd: repoPath,
        });
        if (result.code === 0) {
            return res.status(200).json({
                message: 'Repository built successfully',
                data: result,
            });
        } else {
            return res.status(500).json({
                message: 'Error building repository',
                error: 'Gradle build command failed',
                data: result,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error spawning process',
            error: error.message,
        });
    }
});

router.post('/deploy/:repo', async (req, res) => {
    try {
        const repo = req.params.repo;

        if (!validateInput(repo))
            return res
                .status(400)
                .json({ message: 'Invalid repository name', error: 'Repository name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);

        if (!fs.existsSync(repoPath)) {
            return res.status(404).json({ message: 'Repository not found', error: 'Repository does not exist' });
        }

        const result = await runCommand('sh', ['gradlew', 'deploy'], {
            cwd: repoPath,
        });
        if (result.code === 0) {
            broadcast({ type: 'wpilib_repo_deploy', data: { repoPath, repoName: repo } });
            return res.status(200).json({
                message: 'Repository deployed successfully',
                data: result,
            });
        } else {
            return res.status(500).json({
                message: 'Error deploying repository',
                error: 'Gradle deploy command failed',
                data: result,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error spawning process', error: error.message });
    }
});

export default router;
