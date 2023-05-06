import { Router } from 'express';
import {
    changePassword,
    forgetPassword,
    login,
    registerController,
} from '../../controllers/auth/authController.js';
import { isIpBlock } from '../../middlewares/isIpBlocked.js';

const router = Router();

router.post('/register', isIpBlock, registerController);
router.get('/login', isIpBlock, login);
router.post('/change-password', isIpBlock, changePassword);
router.get('/forget-password', forgetPassword);

export { router as authRoutes };
