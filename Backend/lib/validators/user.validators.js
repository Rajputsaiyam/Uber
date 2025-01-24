const {z} = require('zod');

const userSignupValidationSchema = z.object({
    firstName:z.string().min(3).max(25),
    lastName:z.string().min(3).max(25).optional(true),
    email:z.string().email(),
    password:z.string()
    .min(8,"Password must be at least 8 characters")
    .regex(/[A-Z]/,"Password must contain atleast one Capital letter")
    .regex(/[a-z]/,"Password must contain atleast one Lower case letter")
    .regex(/[0-9]/,"Password must contain atleast one numeric value")
    .regex(/[^A-Za-z0-9]/,"Password must contain atleast one special symbol"),
    
});

const userSigninValidationSchema = z.object({
    email:z.string().email(),
    password:z.string()
});

module.exports = {
    userSignupValidationSchema,
    userSigninValidationSchema
};