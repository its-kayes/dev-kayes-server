import { Router } from 'express';
import { createHealthCheck, getHealthCheck } from '../controllers/healthCheckController.js';
import { validate } from '../middlewares/validateResult.js';

const router = Router();

router.post('/', validate, createHealthCheck);
router.get('/', getHealthCheck);

export { router as healthCheckRoutes };
