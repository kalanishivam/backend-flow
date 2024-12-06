import { Schema, model } from "mongoose";
import { transformIdPlugin } from "../plugins/transformIdPlugin";

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
   
},  {timestamps : true})

userSchema.plugin(transformIdPlugin);
const userModel = model('User' , userSchema);

export default userModel;