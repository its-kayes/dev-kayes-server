import { Router } from 'express';
import { registerController } from '../../controllers/auth/authController.js';

const router = Router();

router.post('/register', registerController);

export { router as authRoutes };
