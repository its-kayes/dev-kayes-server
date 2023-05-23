import { Router } from 'express';
import {
    changePassword,
    forgetPassword,
    login,
    registerController,
    resetPassword,
} from '../../controllers/auth/authController';

const router: Router = Router();

router.post('/register', registerController);
router.get('/login', login);
router.post('/change-password', changePassword);
router.get('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);

export { router as authRoutes };
