import { Schema, model } from "mongoose";
import normalize from 'normalize-mongoose';
const EdgeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    source: {
        type: Schema.Types.ObjectId,
        ref: 'Node',
    
        required: true,
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Node',
        
        required: true,
    }
});

EdgeSchema.plugin(normalize);
const EdgeModel = model('edge' , EdgeSchema);
export default EdgeModel;