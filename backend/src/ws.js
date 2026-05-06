import express from 'express';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected to WebSocket ✅');

    ws.on('message', (message) => {
        // let counter = 0;
        
        // console.log('Received message from client:', message.toString());

        // for (const client of clients) {
        //     if (client !== ws) {
        //         client.send(message.toString());
        //         counter++;
        //     }
        // }
        // console.log(`Message sent to ${counter} clients`);

        console.warn('Client sent a message, ignored it ❌');
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected from WebSocket ❌');
    });  
});

export const broadcast = (message) => {
    for (const client of clients) {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    }
};

server.listen(3001, '0.0.0.0', () => {
    console.log('WebSocket server is running on ws://localhost:3001');
});