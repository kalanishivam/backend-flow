import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginSchema, SignupSchema } from '../types';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import { cookieOptions, JWT_SECRET } from '../config/constants';

export const signupUser = async(req : Request,   res : Response)=>{
    try{
        const parsedData = SignupSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({error : "Invalid input"})
            return;
        }
        const {name , email , password} = parsedData.data;
        const existingUser = await userModel.findOne({email : email});
        if(existingUser){
            res.status(400).json({error : "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const user = await userModel.create({
            userName : name , 
            email : email, 
            password : hashedPassword
        });
        const token = jwt.sign({user} , JWT_SECRET);
        res.cookie('token' , token , cookieOptions);
        res.status(200).json({message : "User created successfully"});
    }catch(error){
        res.status(500).json({error : "Internal server error"});
        console.log(error);
    }
}


export const loginUser = async(req : Request,   res : Response)=>{
    try{
        const parsedData = LoginSchema.safeParse(req.body)
        if(!parsedData.success){
            res.status(400).json({error : "Invalid input"})
            return;
        }
        const {email , password} = parsedData.data;
        const user = await userModel.findOne({email : email});
        if(!user){
            res.status(400).json({error : "Invalid email or password"});
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect){
            res.status(400).json({error : "Invalid email or password"});
            return;
        }
        const token = jwt.sign({user} , JWT_SECRET);
        res.cookie('token' , token , cookieOptions);
        res.status(200).json({message : "Login successful"});
    }catch(error){
        res.status(500).json({error : "Internal server error"});
        console.log(error);
    }
}

export const verifyToken = (req: Request, res: Response) => {
   
    res.status(200).json({ message: "Token is valid" });
  };