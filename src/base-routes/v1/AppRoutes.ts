import { Router } from 'express';
import { healthCheckRoutes } from '../../routes/healthCheckRoutes';
import { authRoutes } from '../../routes/auth/authRoutes';
import { isIpBlock } from '../../middlewares/isIpBlocked';

const router: Router = Router();

router.use('/health-check', healthCheckRoutes);
router.use('/auth', isIpBlock, authRoutes);

export default router;
