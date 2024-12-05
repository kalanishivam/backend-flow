import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user' , userRoutes);


app.listen(()=>{
    console.log(`server started on port ${PORT}`);
})
