import { spawn } from 'node:child_process';

export const runCommand = (command, args, options = {}) =>
    new Promise((resolve, reject) => {
        const child = spawn(command, args, options);
        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (d) => {
            stdout += d.toString();
        });
        child.stderr.on('data', (d) => {
            stderr += d.toString();
        });

        child.on('error', reject);

        child.on('close', (code, signal) => {
            resolve({ code, signal, stdout, stderr });
        });
    });

// Helper function to validate there are no invalid or malicious characters in the input
export const validateInput = (input) => {
    if (!input) return false;
    if (input.includes(' ')) return false;
    if (input.includes('|')) return false;
    if (input.includes('/')) return false;
    if (input.includes('?')) return false;

    return true;
};
