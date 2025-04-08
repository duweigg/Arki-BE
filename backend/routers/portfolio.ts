import { Router, Request, Response } from 'express';
import portfolio from '../mock-data/portfolio.json';

const router = Router();

// GET /api/portfolio/child_001
router.get('/:userId', (req: Request, res: Response) => {
    const data = (portfolio as any)[req.params.userId];
    data ? res.json(data) : res.status(404).json({ error: 'Not found' });
});

export default router;
