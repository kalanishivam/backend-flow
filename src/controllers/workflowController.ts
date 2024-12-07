import { Request, Response } from 'express';
import NodeModel  from '../models/nodeModel';
import WorkflowModel from '../models/workFlowModel';
import EdgeModel from '../models/edgeModel';
import { WorkFlowSchema } from '../types';
import { getNodeSequence, handleNodesDataAndPerformNecessaryAction } from '../utils';

export const getWorkflowsOfUser = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const workflows = await WorkflowModel.find({
            userId : user.id
        } ,  { name: 1, status: 1, createdAt: 1, _id: 0 });
        console.log(workflows)
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
       
        const parsedData = WorkFlowSchema.safeParse(req.body);
        if(!parsedData.success){
          
            res.status(400).json({error : "Invalid input"})
            return;
        }
        
        const {nodes , edges , flowName} = parsedData.data;
        // const edgesWithoutId = edges.map(({ id, ...rest }) => rest);
        // const crateNOde = await NodeModel.create({
        //     id : nodes[0].id,
        //     type : nodes[0].type,
        //     position : nodes[0].position,
        //     data : nodes[0].data,
        // })
        // console.log(crateNOde)
        // const findNode = await NodeModel.findById(nodes[0].id);
        // console.log(findNode)
        // console.log(nodes[0].id)
        const createNodes = await NodeModel.create(nodes);
        const createEdges = await EdgeModel.create(edges);

        
        const nodeIds = createNodes.map(node => node.id);
        const edgeIds = createEdges.map(edge =>edge.id);
        const newWorkFlow = await WorkflowModel.create({
            user : user.id,
            nodes : nodeIds,
            edges : edgeIds,
            name : flowName,
            status : 'active',
            userId : user.id
        });
        const nodesSortedBasedOnPosition = getNodeSequence(nodes , edges)
        console.log(nodesSortedBasedOnPosition);
        console.log(nodes)
        const scheduledJob = await handleNodesDataAndPerformNecessaryAction(nodesSortedBasedOnPosition , newWorkFlow._id.toString()); // for production, one should create a seperate backend process and use a message queue 
       
            
        res.status(200).json({message : 'Workflow created successfully'})
        return;
    }catch(error){
        console.log('error in creating workflow')
        console.log(error)
        res.status(500).json({message : 'Error creating workflow'})
    }
}

export const getWorkflowById = async(req: Request , res: Response)=>{
    try{
        const user = req.user;
        if(!user){
            res.status(401).json({message : 'User not found'})
            return;
        }
        const workflowId = req.params.id;
        const workflow = await WorkflowModel.findById(workflowId);
        if(!workflow){
            res.status(404).json({message : 'Workflow not found'})
            return;
        }
        res.status(200).json(workflow);
    }catch(error){
        console.log(error);
        res.status(500).json({message : 'Error retrieving workflow'})
    }
}