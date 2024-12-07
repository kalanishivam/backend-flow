import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import emailTemplateRoutes from './routes/emailTemplateRoutes';
import workflowRoutes from './routes/workflowRoutes';
import cors from 'cors';
import { connectDB } from './database';
import { initializeAgenda } from './config/initialzeAgenda';
import { mailerConfig, recievier } from './config/mailerConfig';

const app = express();
const PORT = 5000;
connectDB();
initializeAgenda();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/templates', emailTemplateRoutes);
app.use('/api/v1/workflow', workflowRoutes);

mailerConfig.sendMail(recievier , (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})
