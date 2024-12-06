import { Schema, model } from "mongoose";
import normalize from 'normalize-mongoose';

const userSchema = new Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    }
})


userSchema.plugin(normalize);
const userModel = model('User' , userSchema);

export default userModel;