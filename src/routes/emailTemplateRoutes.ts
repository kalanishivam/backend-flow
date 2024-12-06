import { Router } from 'express';
import { createNewEmailTemplate } from '../controllers/emailTemplateController';
import { authMiddleware } from '../middlewares/auth';


const router = Router();

router.post('/create',authMiddleware, createNewEmailTemplate);
// router.get('/verify', authenticateToken, verifyTokenController);



export default router;