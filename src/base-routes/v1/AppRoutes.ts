import { Router } from 'express';
import { healthCheckRoutes } from '../../routes/healthCheckRoutes.js';

const router = Router();

router.use('/health-check', healthCheckRoutes);

// export const v1Routes = router;
export default router;
