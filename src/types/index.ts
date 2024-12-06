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
// {
//     "email" : "test@test.com",
//     "password" : "test1234",
//     "name" : "testname"
// }
export const NodeSchema = z.object({
    id: z.string(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
    data: z.object({
      
      source: z.unknown(),
    }),
    type: z.string(),
    measured: z.optional(
      z.object({
        width: z.number(),
        height: z.number(),
      })
    ),
    
    selected: z.optional(z.boolean()),
    dragging: z.optional(z.boolean()),
  });

export const EdgeSchema = z.object({
    source: z.string(),               
    sourceHandle: z.string(),         
    target: z.string(),               
    targetHandle: z.string(),        
    id: z.string(),                   
});

export const WorkFlowSchema = z.object({
    nodes : z.array(NodeSchema),
    edges : z.array(EdgeSchema),
    flowName : z.string()
})