import { Router } from 'express';
import { loginUser, signupUser } from '../controllers/userController';

const router = Router();

router.post('/signup', signupUser);
// router.get('/verify', authenticateToken, verifyTokenController);
router.post('/login' ,  loginUser);


export default router;