// backend/src/ws-server.ts
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import fs from 'fs';
import path from 'path';

const chatHistory: Record<string, Message[]> = {};
const clients: Record<string, Set<WebSocket>> = {};

export const initWebSocketServer = (server: http.Server) => {
    const wss = new WebSocketServer({ server });
    wss.on('connection', (ws, req) => {
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const familyId = url.searchParams.get('familyId');

        if (!familyId) {
            ws.close();
            return;
        }

        (ws as any).familyId = familyId; // store it on this connection

        if (!clients[familyId]) clients[familyId] = new Set();
        clients[familyId].add(ws);

        ws.on('message', (raw) => {
            try {
                const msg = JSON.parse(raw.toString());
                const familyId = (ws as any).familyId;

                if (!familyId || !clients[familyId]) return;

                console.log(`💬 ${msg.role} sent message to family ${familyId}: ${msg.message}`);

                // broadcast message
                clients[familyId].forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(msg));
                    }
                });

                // persist message
                if (!chatHistory[familyId]) chatHistory[familyId] = [];
                chatHistory[familyId].push(msg);
                saveChatToFile(familyId, chatHistory[familyId])

            } catch (err) {
                console.error('Error processing message:', err);
            }
        });

        ws.on('close', () => {
            const fid = (ws as any).familyId;
            console.log(`❎ Disconnected from family ${fid}`);
            clients[fid]?.delete(ws);
        });
    });

};


const CHAT_FILE = path.join(__dirname, './mock-data/chatMessages.json');

function saveChatToFile(familyId: string, messages: Message[]) {
    const existing = fs.existsSync(CHAT_FILE)
        ? JSON.parse(fs.readFileSync(CHAT_FILE, 'utf-8'))
        : {};
    existing[familyId] = [...existing[familyId], ...messages];

    fs.writeFileSync(CHAT_FILE, JSON.stringify(existing, null, 2));
}