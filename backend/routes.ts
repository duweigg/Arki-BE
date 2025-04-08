import { Router } from 'express';

import portfolioRouter from './routers/portfolio';
import investmentRouter from './routers/investment';
import familyRouter from './routers/family';
import chatRouter from './routers/chat';

const router = Router();

router.use('/portfolio', portfolioRouter);
router.use('/investment', investmentRouter);
router.use('/family', familyRouter);
router.use('/chat', chatRouter);

export default router;
