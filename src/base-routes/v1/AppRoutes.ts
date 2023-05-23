import { Router } from 'express';
import { healthCheckRoutes } from '../../routes/healthCheckRoutes.js';
import { authRoutes } from '../../routes/auth/authRoutes.js';
import { isIpBlock } from '../../middlewares/isIpBlocked.js';

const router: Router = Router();

router.use('/health-check', healthCheckRoutes);
router.use('/auth', isIpBlock, authRoutes);

export default router;
