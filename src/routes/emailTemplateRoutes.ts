import { Router } from 'express';
import { createNewEmailTemplate, getUserEmailTemplates } from '../controllers/emailTemplateController';
import { authMiddleware } from '../middlewares/auth';


const router = Router();

router.post('/create',authMiddleware, createNewEmailTemplate);
router.get('/' , authMiddleware , getUserEmailTemplates)
// router.get('/verify', authenticateToken, verifyTokenController);



export default router;