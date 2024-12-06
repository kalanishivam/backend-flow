import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { EmailTemplateSchema, LoginSchema, SignupSchema } from '../types';
import EmailTemplateModel from '../models/emailTemplateModel';


export const createNewEmailTemplate = async(req : Request,   res : Response)=>{
    try{
        const parsedData = EmailTemplateSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({error : "Invalid input"})
            return;
        }
        const {name , subject , body} = parsedData.data;
        const user = req.user;
        // console.log(user)
        // console.log(`this is the user information`)
        if(!user){
            res.status(400).json({error : "No user found"});
        }
        const newEmailTemplate = await EmailTemplateModel.create({
            name : name , 
            subject : subject,
            body : body,
            user : user.id
        })
        res.status(200).json({message : "Email template created successfully"});
    }catch(error){
        res.status(500).json({error : "Internal server error"});
        console.log(error);
    }
}

export const getUserEmailTemplates = async(req : Request , res: Response)=>{
    try{
        const user = req.user;
        if(!user){
            res.status(400).json({error : "No user found"});
            return;
        }
        const emailTemplates = await EmailTemplateModel.find({user : user.id});
        res.status(200).json(emailTemplates)
    }catch(error){
        res.status(500).json({error : "Internal server error"});
    }
}