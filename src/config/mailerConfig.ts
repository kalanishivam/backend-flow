import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const mailerConfig = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
    },
});

// export const recievier = {
//     from : "exmplusershivam07@gmail.com",
//     to : ["kalanishivam@gmail.com","shivamkalani.ece23@jecrc.ac.in"],
//     subject : "new mail",
//     text : "This is a new test mail"
// }

export const getMessageMetaData = async(to : string[] , subject : string,  text : string)=>{
    return {
    from : "exmplusershivam07@gmail.com",
    to : to,
    subject : subject,
    text : text
    }
}