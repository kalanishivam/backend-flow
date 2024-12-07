import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import emailTemplateRoutes from './routes/emailTemplateRoutes';
import workflowRoutes from './routes/workflowRoutes';
import cors from 'cors';
import { connectDB } from './database';
import { initializeAgenda } from './config/initialzeAgenda';
import { mailerConfig } from './config/mailerConfig';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;;
connectDB();
initializeAgenda();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/templates', emailTemplateRoutes);
app.use('/api/v1/workflow', workflowRoutes);



app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})
