import { AgendaConfig } from "../config/agenda";
import { getMessageMetaData } from "../config/mailerConfig";
import EmailTemplateModel from "../models/emailTemplateModel";

interface NodeOfFlow {
    id: string;
    type: string;
    position?: { x: number; y: number };
    data: any;
    [key: string]: any;
}

interface Edge {
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    id: string;
}


export function getNodeSequence(nodes: NodeOfFlow[], edges: Edge[]): NodeOfFlow[] {
    
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    
    
    const allTargets = new Set(edges.map(edge => edge.target));
    const startingNode = nodes.find(node => !allTargets.has(node.id));
    
    if (!startingNode) {
        throw new Error('No starting node found');
    }
    
    
    const sequence: NodeOfFlow[] = [startingNode];
    let currentNodeId = startingNode.id;
    
  
    const processedEdges = new Set<string>();
    
   
    while (true) {
        
        const nextEdge = edges.find(
            edge => edge.source === currentNodeId && !processedEdges.has(edge.id)
        );
        
       
        if (!nextEdge) break;
        
      
        processedEdges.add(nextEdge.id);
        
     
        const nextNode = nodeMap.get(nextEdge.target);
        
        if (!nextNode) {
            throw new Error(`Node with id ${nextEdge.target} not found`);
        }
        
        sequence.push(nextNode);
        
      
        currentNodeId = nextNode.id;
    }
    
    return sequence;
}

type HandleNodesDataAndPerformNecessaryActionResponse = {success : boolean;}
export const handleNodesDataAndPerformNecessaryAction = async(nodes : NodeOfFlow[] , workflowId : string) : Promise<HandleNodesDataAndPerformNecessaryActionResponse>=>{
    try{
        let delayTime = 0;
        let emailsToSend : string[] = [];
        
        for(let i = 0 ; i < nodes.length ; i++){
            const currentNode = nodes[i];
            if(currentNode.type == 'addLeadNode'){
                const emails = currentNode.data.source.map((lead: any) => lead.email); 
                emailsToSend.push(...emails);
            }else if(currentNode.type == 'delayNode'){
                const { waitTime, type } = currentNode.data.source;
                let delayInSeconds = 0;
                switch (type) {
                    case 'Minutes':
                        delayInSeconds = waitTime * 60;
                        break;
                    case 'Hours':
                        delayInSeconds = waitTime * 60 * 60;
                        break;
                    case 'Days':
                        delayInSeconds = waitTime * 24 * 60 * 60;
                        break;
                    default:
                        console.error('Unknown time type:', type);
                        break;
                }
             
                
                delayTime += delayInSeconds;
               
            }else if(currentNode.type == 'emailTemplateNode'){
                const templateId = currentNode.data.source.id;
                const emailTemplate = await EmailTemplateModel.findById(templateId);
                if (!emailTemplate) {
                    console.error(`Email template with id ${templateId} not found`);
                    throw new Error('no email template found with that email')
                }
                const { subject, body } = emailTemplate;
                // delayTime = 10;
                await AgendaConfig.getInstance().schedule(new Date(Date.now() + delayTime * 1000), 'sendEmail', { emailsToSend , subject , body , workflowId});
                delayTime = 0;
              
            }
        }
        console.log('in here in the handle nodes data and perform necessary aciton function before success true')
        return {success : true};
    }catch(error){
        console.log('error in handling nodes data and performing necessary action') 
        console.log(error);
        return {success : false};
    }
}