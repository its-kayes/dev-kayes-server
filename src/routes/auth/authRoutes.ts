import { Router } from 'express';
import { checkMailSend, registerController } from '../../controllers/auth/authController.js';

const router = Router();

router.post('/register', registerController);
//router.post('/send-mail-check', checkMailSend);

export { router as authRoutes };
