import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { runCommand } from './utils.js';
import { broadcast } from './ws.js';

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

const commandOutput = ({ code, signal, stdout, stderr }) => ({ code, signal, stdout, stderr });

router.post('/repos/:repo/clone', async (req, res) => {
    try {
        const repo = req.params.repo;

        if (!validateInput(repo))
            return res
                .status(400)
                .json({ message: 'Invalid repository name', error: 'Repository name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);
        const repoUrl = `https://github.com/frc-862/${repo}.git`;

        const result = await runCommand('git', ['clone', repoUrl, repoPath]);

        if (result.code === 0) {
            broadcast({ type: 'github_repo_clone', data: { repoPath, repoName: repo } });

            return res.status(201).json({
                message: 'Repository cloned successfully',
                data: { repoPath, repoName: repo, ...commandOutput(result) },
            });
        }

        return res.status(500).json({
            message: 'Error cloning repository',
            error: 'Git clone command failed',
            data: commandOutput(result),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error cloning repository', error: error.message });
    }
});

router.get('/repos', async (req, res) => {
    try {
        const repos = fs.readdirSync(path.join(process.cwd(), '../', 'repos'));
        return res.status(200).json({ message: 'Repositories listed successfully', data: repos });
    } catch (error) {
        return res.status(500).json({ message: 'Error listing repositories', error: error.message });
    }
});

router.get('/repos/:repo/branches', async (req, res) => {
    try {
        const repo = req.params.repo;

        if (!validateInput(repo))
            return res
                .status(400)
                .json({ message: 'Invalid repository name', error: 'Repository name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);

        const result = await runCommand('git', ['branch', '-r', '--format="%(refname:short)"'], { cwd: repoPath });

        if (result.code === 0) {
            const formattedBranches = result.stdout
                .trim()
                .split('\n')
                .map((line) => line.trim().split('/').pop().replace(/^"|"$/g, ''))
                .filter(Boolean);

            return res.status(200).json({
                message: 'Branches listed successfully',
                data: { branches: formattedBranches, ...commandOutput(result) },
            });
        }

        return res.status(500).json({
            message: 'Error listing branches',
            error: 'Git branch command failed. Have you cloned the repo yet?',
            data: commandOutput(result),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error listing branches', error: error.message });
    }
});

router.post('/repos/:repo/checkout/:branch', async (req, res) => {
    try {
        const repo = req.params.repo;
        const branch = req.params.branch;

        if (!(validateInput(branch) && validateInput(repo)))
            return res
                .status(400)
                .json({ message: 'Invalid branch name', error: 'Branch name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);

        const result = await runCommand('git', ['checkout', branch], { cwd: repoPath });

        if (result.code === 0) {
            broadcast({ type: 'branch_checkout', data: { repoPath, repoName: repo, branch } });

            return res.status(200).json({
                message: 'Branch checked out successfully',
                data: { repoPath, repoName: repo, branch, ...commandOutput(result) },
            });
        }

        return res.status(500).json({
            message: 'Error checking out branch',
            error: 'Git checkout command failed. Is the branch name valid?',
            data: commandOutput(result),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error checking out branch', error: error.message });
    }
});

router.post('/repos/:repo/pull', async (req, res) => {
    try {
        const repo = req.params.repo;

        if (!validateInput(repo))
            return res
                .status(400)
                .json({ message: 'Invalid repository name', error: 'Repository name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);

        const result = await runCommand('git', ['pull', '--prune'], { cwd: repoPath });

        if (result.code === 0) {
            broadcast({ type: 'github_repo_pull', data: { repoPath, repoName: repo } });

            return res.status(200).json({
                message: 'Repository pulled successfully',
                data: { repoPath, repoName: repo, ...commandOutput(result) },
            });
        }

        return res.status(500).json({
            message: 'Error pulling repository',
            error: 'Git pull command failed',
            data: commandOutput(result),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error pulling repository', error: error.message });
    }
});

router.post('/repos/:repo/fetch', async (req, res) => {
    try {
        const repo = req.params.repo;

        if (!validateInput(repo))
            return res
                .status(400)
                .json({ message: 'Invalid repository name', error: 'Repository name contains invalid characters' });

        const repoPath = path.join(process.cwd(), '../', 'repos', repo);

        const result = await runCommand('git', ['fetch', '--prune'], { cwd: repoPath });

        if (result.code === 0) {
            broadcast({ type: 'github_repo_fetch', data: { repoPath, repoName: repo } });

            return res.status(200).json({
                message: 'Repository fetched successfully',
                data: { repoPath, repoName: repo, ...commandOutput(result) },
            });
        }

        return res.status(500).json({
            message: 'Error fetching repository',
            error: 'Git fetch command failed',
            data: commandOutput(result),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching repository', error: error.message });
    }
});

export default router;
