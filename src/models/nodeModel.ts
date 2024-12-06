import { Schema, model } from "mongoose";
import { transformIdPlugin } from "../plugins/transformIdPlugin";
// import normalize from 'normalize-mongoose';

const NodeSchema = new Schema({
    type: { 
        type: String, 
        // enum: ['COLD_EMAIL', 'WAIT_DELAY', 'LEAD_SOURCE'],
        required: true 
    },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    data: {
        type: Schema.Types.Mixed,
        required: true
    },
    measured: {
        width: { type: Number },
        height: { type: Number }
    },
    selected: {
        type: Boolean,
        default: false
    }
});
// NodeSchema.plugin(normalize);  
NodeSchema.plugin(transformIdPlugin) 
const NodeModel = model('node' , NodeSchema);    

export default NodeModel;