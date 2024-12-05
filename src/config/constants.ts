import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET ?? '';
export const cookieOptions = {
    httpOnly: true,
    //other options can be added here as well
};