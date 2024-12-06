import { Schema, model } from "mongoose";
import { transformIdPlugin } from "../plugins/transformIdPlugin";

const EdgeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        _id: false
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

// EdgeSchema.plugin(transformIdPlugin);
const EdgeModel = model('edge' , EdgeSchema);
export default EdgeModel;