import { Router, Request, Response } from 'express';
import chat from '../mock-data/chatMessages.json';

const router = Router();

// GET /api/chat/fam_001
router.get('/:familyId', (req: Request, res: Response) => {
    const data = (chat as any)[req.params.familyId];
    data ? res.json(data) : res.status(404).json({ error: 'Not found' });
});

export default router;
