import { Schema, model } from "mongoose";
import normalize from 'normalize-mongoose';

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
        ref: 'Edge',
    }],
    status: {
        type: String,
        enum: ['inProgress', 'active', 'paused', 'completed'],
        default: 'active'
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
WorkflowSchema.plugin(normalize);
const WorkflowModel = model('workflow' , WorkflowSchema);

export default WorkflowModel;