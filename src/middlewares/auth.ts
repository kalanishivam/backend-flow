import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

export const authMiddleware = async(req : Request , res : Response , next : NextFunction)=>{
    const token = req.cookies.token;
    // console.log('verify hre token')
    if(!token){
        console.log('in the !token part')
        res.status(401).json({error : "Unauthorized"});
        return;
    }
    try{
        const decodedToken = jwt.verify(token , JWT_SECRET) as {user : string};
        // console.log(decodedToken);
        // console.log(`the user value is ; `)
        // console.log(decodedToken.user);
        req.user = decodedToken.user;
        next();
    }catch(error){
        res.status(401).json({error : "Unauthorized"});
    }
}