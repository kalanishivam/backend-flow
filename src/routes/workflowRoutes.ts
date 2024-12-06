import { Router } from 'express';
import { createNewWorkFlow, getWorkflowsOfUser } from '../controllers/workflowController';
import { authMiddleware } from '../middlewares/auth';
const router = Router();


// router.get('/:id' ,authMiddleware)
router.get('/', authMiddleware ,getWorkflowsOfUser)
router.post('/create' ,authMiddleware, createNewWorkFlow)
export default router;