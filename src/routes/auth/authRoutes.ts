import { Router } from 'express';
import { login, registerController } from '../../controllers/auth/authController.js';

const router = Router();

router.post('/register', registerController);
router.get('/login', login);

export { router as authRoutes };
