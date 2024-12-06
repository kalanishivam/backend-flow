import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import emailTemplateRoutes from './routes/emailTemplateRoutes';
import cors from 'cors';
import { connectDB } from './database';

const app = express();
const PORT = 5000;
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use('/api/v1/user' , userRoutes);
app.use('/api/v1/templates' , emailTemplateRoutes);

app.listen(PORT , ()=>{
    console.log(`server started on port ${PORT}`);
})
