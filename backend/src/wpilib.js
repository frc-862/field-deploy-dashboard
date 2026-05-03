import express from 'express';
import path from 'node:path';
import { spawn } from 'node:child_process';
const router = express.Router();

const runGradleCommand = (command, repo, onClose, onError) => {
    const repoPath = path.join(process.cwd(), '../', 'repos', repo);

    const deploy = spawn('sh', ['gradlew', command], { cwd: repoPath });

    // TODO: ADD SOME WAY TO LOG THE OUTPUT OF THE COMMAND
    // deploy.stdout.on('data', (data) => {
    //     console.log(data.toString());
    // });

    // deploy.stderr.on('data', (data) => {
    //     console.error(data.toString());
    // });

    deploy.on('close', onClose);

    deploy.on('error', onError);
};

router.get('/build/:repo', (req, res) => {
    try {
        runGradleCommand(
            'build',
            req.params.repo,
            (code) => {
                if (code === 0) {
                    return res.status(200).json({
                        message: 'Repository built successfully',
                    });
                } else {
                    return res.status(500).json({
                        message: 'Error building repository',
                        error: 'Gradle build command failed',
                    });
                }
            },
            (error) => {
                return res.status(500).json({
                    message: 'Error building repository',
                    error: error.message,
                });
            }
        );
    } catch (error) {
        return res.status(500).json({
            message: 'Error building repository',
            error: error.message,
        });
    }
});

router.get('/deploy/:repo', (req, res) => {
    try {
        runGradleCommand(
            'deploy',
            req.params.repo,
            (code) => {
                if (code === 0) {
                    return res.status(200).json({
                        message: 'Repository deployed successfully',
                    });
                } else {
                    return res.status(500).json({
                        message: 'Error deploying repository',
                        error: 'Gradle deploy command failed',
                    });
                }
            },
            (error) => {
                return res.status(500).json({
                    message: 'Error deploying repository',
                    error: error.message,
                });
            }
        );
    } catch (error) {
        return res.status(500).json({
            message: 'Error deploying repository',
            error: error.message,
        });
    }
});

export default router;
