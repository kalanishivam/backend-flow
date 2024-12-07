import { Router } from 'express';
import { loginUser, logout, signupUser, verifyToken } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/signup', signupUser);
router.post('/verify', authMiddleware, verifyToken);
router.post('/login' ,  loginUser);
router.post('/logout',authMiddleware, logout);


export default router;