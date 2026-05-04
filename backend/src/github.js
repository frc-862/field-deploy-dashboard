import express from 'express';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const router = express.Router();

// Helper function to validate there are no invalid or malicious characters in the input
const validateInput = (input) => {
    if (!input) return false;
    if (input.includes(' ')) return false;
    if (input.includes('|')) return false;
    if (input.includes('/')) return false;
    if (input.includes('?')) return false;

    return true;
};

router.post('/repos/:repo/clone', async (req, res) => {
    try {
        // Get the repo name directly from the URL
        const repo = req.params.repo;

        // Validate the input is not injecting something that could cause the repo to end up where it shouldn't be
        if (!validateInput(repo))
            return res
                .status(400)
                .json({ message: 'Invalid repository name', error: 'Repository name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);

        // Create the full git url using the repo name
        const repoUrl = `https://github.com/frc-862/${repo}.git`;

        // Run the git clone command using the url and clone it into the repos directory
        const gitClone = spawn('git', ['clone', repoUrl, repoPath]);

        // Attach the real result of the command to the response
        gitClone.on('close', (code) => {
            if (code === 0) {
                return res
                    .status(201)
                    .json({ message: 'Repository cloned successfully', data: { repoPath, repoName: repo } });
            } else {
                return res.status(500).json({ message: 'Error cloning repository', error: 'Git clone command failed' });
            }
        });

        // Handle the errors from the seperate processes
        gitClone.on('error', (code) => {
            return res.status(500).json({ message: 'Error cloning repository', error: 'Git clone command failed' });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error cloning repository', error: error.message });
    }
});

router.get('/repos', async (req, res) => {
    try {
        // Read the repos directory and list all the repositories
        const repos = fs.readdirSync(path.join(process.cwd(), '../', 'repos'));
        return res.status(200).json({ message: 'Repositories listed successfully', data: repos });
    } catch (error) {
        return res.status(500).json({ message: 'Error listing repositories', error: error.message });
    }
});

router.get('/repos/:repo/branches', async (req, res) => {
    try {
        const repo = req.params.repo;
        // Validate the input is not injecting something that could cause the repo to end up where it shouldn't be
        if (!validateInput(repo))
            return res
                .status(400)
                .json({ message: 'Invalid repository name', error: 'Repository name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);

        // Run the git branch command using the repo path and list the branches-- formats the branches with no *
        const gitBranch = spawn('git', ['branch', '-r', '--format="%(refname:short)"'], { cwd: repoPath });
        let branches = '';

        // Add the results to the branches value
        gitBranch.stdout.on('data', (data) => (branches += data.toString()));

        // When the command is finished, format the branches and return the response
        gitBranch.on('close', (code) => {
            if (code === 0) {
                // Format branches from string to array
                const formattedBranches = branches
                    .trim()
                    .split('\n')
                    .map((line) => line.trim().split('/').pop().replace(/^"|"$/g, ''))
                    .filter(Boolean);

                return res
                    .status(200)
                    .json({ message: 'Branches listed successfully', data: { branches: formattedBranches } });
            } else {
                return res.status(500).json({ message: 'Error listing branches', error: 'Git branch command failed' });
            }
        });

        // Handle the errors from the seperate processes
        gitBranch.on('error', () => {
            return res.status(500).json({
                message: 'Error listing branches',
                error: 'Git branch command failed. Have you cloned the repo yet?',
            });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error listing branches', error: error.message });
    }
});

router.post('/repos/:repo/checkout/:branch', async (req, res) => {
    try {
        const repo = req.params.repo;
        const branch = req.params.branch;

        // Validate the input is not injecting something that could cause the repo to end up where it shouldn't be
        if (!(validateInput(branch) && validateInput(repo)))
            return res
                .status(400)
                .json({ message: 'Invalid branch name', error: 'Branch name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);

        // Run the git checkout command using the branch name and checkout the branch
        const gitCheckout = spawn('git', ['checkout', branch], { cwd: repoPath });

        // Attach the real result of the command to the response
        gitCheckout.on('close', (code) => {
            if (code === 0) {
                return res.status(200).json({
                    message: 'Branch checked out successfully',
                    data: { repoPath, repoName: repo, branch: branch },
                });
            } else {
                return res.status(500).json({
                    message: 'Error checking out branch',
                    error: 'Git checkout command failed. Is the branch name valid?',
                });
            }
        });

        // Handle the errors from the seperate processes
        gitCheckout.on('error', (code) => {
            return res.status(500).json({ message: 'Error checking out branch', error: 'Git checkout command failed' });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error checking out branch', error: error.message });
    }
});

export default router;
