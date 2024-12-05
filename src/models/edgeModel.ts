import { Schema, model } from "mongoose";

const EdgeSchema = new Schema({
    source: {
        type: Schema.Types.ObjectId,
        ref: 'Node',
        required: true
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Node',
        required: true
    }
});

const EdgeModel = model('edge' , EdgeSchema);
export default EdgeModel;