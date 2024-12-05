import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async()=>{
    const URL = process.env.MONGO_URI || '';
    try{
        await mongoose.connect(URL);
        console.log(`connected to database`)
    }catch(error){
        console.log(`error connecting to databse`)
    }
}