import { Router } from 'express';
import { createHealthCheck, getHealthCheck } from '../controllers/healthCheckController';
import { validate } from '../middlewares/validateResult';

const router = Router();

router.post('/', validate, createHealthCheck);
router.get('/', getHealthCheck);

export { router as healthCheckRoutes };
