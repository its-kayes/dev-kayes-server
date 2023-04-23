import { Router } from 'express';
import { createHealthCheck, getHealthCheck } from '../controllers/healthCheckController.js';

const router = Router();

router.post('/', createHealthCheck);
router.get('/', getHealthCheck);

export const healthCheckRoutes = router;
