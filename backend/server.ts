import express from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import routes from './routes';
import { initWebSocketServer } from './ws-server';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/logos', express.static(path.join(__dirname, './logos')));
app.use('/api', routes);

const server = http.createServer(app);
initWebSocketServer(server);

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`🚀 Server + WebSocket running at http://localhost:${PORT}`);
});
