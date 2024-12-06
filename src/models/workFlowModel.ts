import { Schema, model } from "mongoose";
// import { transformIdPlugin } from "../plugins/transformIdPlugin";

const WorkflowSchema = new Schema({
    // id: { type: String, required: true, _id: false } ,
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
// WorkflowSchema.plugin(transformIdPlugin);
const WorkflowModel = model('workflow' , WorkflowSchema);

export default WorkflowModel;