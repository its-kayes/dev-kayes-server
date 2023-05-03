import { Router } from 'express';
import {
    changePassword,
    login,
    registerController,
} from '../../controllers/auth/authController.js';
import { isIpBlock } from '../../middlewares/isIpBlocked.js';

const router = Router();

router.post('/register', isIpBlock, registerController);
router.get('/login', isIpBlock, login);
router.post('/change-password', isIpBlock, changePassword);

export { router as authRoutes };
