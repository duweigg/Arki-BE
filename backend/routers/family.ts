import { Router, Request, Response } from 'express';
import family from '../mock-data/familyGroups.json';

const router = Router();

// GET /api/family/fam_001
router.get('/:familyId', (req: Request, res: Response) => {
  const data = (family as any)[req.params.familyId];
  data ? res.json(data) : res.status(404).json({ error: 'Not found' });
});
router.post('/', (req: Request, res: Response) => {
  const { name, role } = req.body;

  if (!name || !role) {
    res.status(400).json({ error: 'Name and role are required.' });
    return
  }

  // Search through each family group
  for (const [familyId, group] of Object.entries(family)) {
    const member = group.members.find(
      (m) => m.name === name && m.role === role
    );

    const child = group.members.find(
      (m) => m.role === "Child"
    );
    const childId = child?.userId

    if (member) {
      res.json({ familyId, ...group, childId, userid: member.userId });
      return
    }
  }

  res.status(404).json({ error: 'No matching family member found.' });
});


export default router;
