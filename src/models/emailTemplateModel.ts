import { Schema, model } from "mongoose";

const EmailTemplateSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    subject : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }, {
      timestamps: true
})


EmailTemplateSchema.index({ user: 1, name: 1 }, { unique: true });

const EmailTemplateModel = model('EmailTemplate' , EmailTemplateSchema);    

export default EmailTemplateModel;