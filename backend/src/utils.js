import { spawn } from 'node:child_process';

export const runCommandAndStreamOutput = (command, args, options, res) => {
    const child = spawn(command, args, options);

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
    });
    res.flushHeaders();

    const writeChunk = (chunk) => {
        const lines = chunk.toString().split('\n');

        for (const line of lines) {
          if (line) res.write(`data: ${line}\n\n`);
        }
    };

    child.stdout.on('data', writeChunk);
    child.stderr.on('data', writeChunk);

    child.on('error', (error) => {
        res.write(`error: ${error.message}\n\n`);
        if (!res.writableEnded) {
            res.end();
        }
    });

    child.on('close', (code) => {
        if (code === 0) {
            res.write(`data: Command executed successfully\n\n`);
        } else {
            res.write(`data: Command execution failed\n\n`);
        }
        res.end();
    });

    res.on('close', () => child.kill());
}; 