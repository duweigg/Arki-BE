import { Router, Request, Response } from 'express';
import investments from '../mock-data/investments.json';

const router = Router();

// GET /api/holdings/child_001
router.get('/:userId', (req: Request, res: Response) => {
    const data = (investments as any)[req.params.userId];
    data ? res.json(data) : res.status(404).json({ error: 'Not found' });
});


export default router;
