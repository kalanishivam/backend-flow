import z from 'zod';

export const SignupSchema = z.object({
    name : z.string(),
    email : z.string().email({message : "Invalid email address"}),
    password : z.string().min(8 , {message : "Password must be at least 8 characters"})
})

export const LoginSchema = z.object({
    email : z.string().email(),
    password : z.string()
})

export const EmailTemplateSchema = z.object({
    name : z.string().min(5 , {message : "Name must be at least 5 characters"}),
    subject : z.string().min(5 , {message : "Subject must be at least 5 characters"}),
    body : z.string().min(5 , {message : "Body must be at least 5 characters"}),
})

// {
//     "name" : "Shivam",
//     "email" : "kalanishivam@gmail.com",
//     "password" : "shivam1234"
// }