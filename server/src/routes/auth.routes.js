import express from 'express';
import { register, login, getMe, logout } from '../controllers/auth.controller.js';
import { validateBody, registerSchema, loginSchema } from '../validators/auth.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

export default router;
