import { Request, Response } from 'express';
import NodeModel  from '../models/nodeModel';
import WorkflowModel from '../models/workFlowModel';
import EdgeModel from '../models/edgeModel';

export const getWorkflowsOfUser = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const workflows = await WorkflowModel.find({
            user: user._id,
        });
        res.status(200).json(workflows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving workflows' });
    }
};

export const createNewWorkFlow = async(req: Request , res: Response)=>{
    try{
        const user = req.user;
        if(!user){
            res.status(401).json({message : 'User not found'})
            return;
        }
        
    }catch(error){
        res.status(500).json({message : 'Error creating workflow'})
    }
}