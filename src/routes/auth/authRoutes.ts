import { Router } from 'express';
import { login, registerController } from '../../controllers/auth/authController.js';
import { isIpBlock } from '../../middlewares/isIpBlocked.js';

const router = Router();

router.post('/register', registerController);
router.get('/login', isIpBlock, login);

export { router as authRoutes };
