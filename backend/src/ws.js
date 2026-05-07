import { WebSocketServer } from 'ws';

const clients = new Set();

export const attachWebSocketServer = (server) => {
    // Fixed path so dev proxies can forward WS without colliding with the dev server's own WebSocket.
    const wss = new WebSocketServer({ server, path: '/ws' });

    wss.on('connection', (ws) => {
        clients.add(ws);
        console.log('Client connected to WebSocket ✅');

        ws.on('close', () => {
            clients.delete(ws);
            console.log('Client disconnected from WebSocket ❌');
        });
    });

    return wss;
};

export const broadcast = (message) => {
    for (const client of clients) {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    }
};
