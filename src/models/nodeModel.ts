import { Schema, model } from "mongoose";

const NodeSchema = new Schema({
    type: { 
        type: String, 
        enum: ['COLD_EMAIL', 'WAIT_DELAY', 'LEAD_SOURCE'],
        required: true 
    },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    data: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const NodeModel = model('node' , NodeSchema);    

export default NodeModel;