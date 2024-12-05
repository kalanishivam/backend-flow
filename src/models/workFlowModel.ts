import { Schema, model } from "mongoose";

const WorkflowSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    nodes: [{
        type: Schema.Types.ObjectId,
        ref: 'Node'
    }],
    edges: [{
        type: Schema.Types.ObjectId,
        ref: 'Edge'
    }],
    status: {
        type: String,
        enum: ['draft', 'active', 'paused', 'completed'],
        default: 'draft'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const WorkflowModel = model('workflow' , WorkflowSchema);

export default WorkflowModel;