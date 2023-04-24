import { Router } from 'express';
import { healthCheckRoutes } from '../../routes/healthCheckRoutes.js';
import { authRoutes } from '../../routes/auth/authRoutes.js';

const router = Router();

router.use('/health-check', healthCheckRoutes);
router.use('/auth', authRoutes);

// export const v1Routes = router;
export default router;
