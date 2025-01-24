const {z} = require('zod');

const captainSignupValidationSchema = z.object({
    firstname:z.string().min(3).max(25),
    lastname:z.string().min(3).max(25).optional(true),
    email:z.string().email(),
    password:z.string()
    .min(8,"Password must be at least 8 characters")
    .regex(/[A-Z]/,"Password must contain atleast one Capital letter")
    .regex(/[a-z]/,"Password must contain atleast one Lower case letter")
    .regex(/[0-9]/,"Password must contain atleast one numeric value")
    .regex(/[^A-Za-z0-9]/,"Password must contain atleast one special symbol"),
    vehicle:z.object({
        color:z.string().min(3),
        plate:z.string().min(3),
        capacity:z.number().min(1),
        vehicleType:z.string().regex(/car|motorcycle|auto/)
    }),
    location:z.object({
        lat:z.number(),
        lon:z.number()
    })
    
});

const captainSigninValidationSchema = z.object({
    email:z.string().email(),
    password:z.string()
});

module.exports = {
    captainSignupValidationSchema,
    captainSigninValidationSchema
};