import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// GET /api/chat/fam_001
router.get('/:familyId', (req: Request, res: Response) => {
    const CHAT_FILE = path.join(__dirname, '../mock-data/chatMessages.json');

    try {
        const raw = fs.readFileSync(CHAT_FILE, 'utf-8');
        const allChats = JSON.parse(raw);
        const data = allChats[req.params.familyId];

        data ? res.json(data) : res.status(404).json({ error: 'Not found' });
    } catch (err) {
        console.error('Failed to load chat file:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
