const {
    userSignupValidationSchema,
    userSigninValidationSchema
} = require('../lib/validators/user.validators');
const AuthService = require('../service/user.service');
const User = require('../models/user.models');
const AuthError = require('../error/app.error');
const JWT = require('jsonwebtoken');

async function handleSignUp(req, res) {
    const body = req.body;
    console.log("In user controller")
    console.log(body);
    const validationResult = await userSignupValidationSchema.safeParseAsync(req.body);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error });
    }
    
    const { firstName, lastName, email, password } = validationResult.data;

    const isUserAlreadyexist = await User.findOne({ email });
    if (isUserAlreadyexist) {
        return res.status(400).json({ error: 'User already exists' });
    }

    try {
        const token = await AuthService.signupWithEmailAndPassword({
            firstName,
            lastName,
            email,
            password
        });
        return res.status(201).json({ status: 'success', token });
    } catch (err) {
        if (err instanceof AuthError) {
            return res.status(err.code).json({ status: 'error', message: err.message });
        }
        return res.status(500).json({ status: 'error', error: err.message });
    }
}

async function handleSignIn(req, res) {
    const validationResult = await userSigninValidationSchema.safeParseAsync(req.body);
    console.log(validationResult.data);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error });
    }

    const { email, password } = validationResult.data;
    console.log(password);
    try {
        const token = await AuthService.signinWithEmailAndPassword({ email, password });
        console.log("token in handle sign in ");
        console.log(token);
        return res.status(201).json({
            status: 'success',
            message: `success in sign in for ${email}`,
            token
        });

    } catch (err) {
        if (err instanceof AuthError) {
            return res.status(err.code).json({ status: 'error', message: err.message });
        }
        return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }

}

async function handleMe(req, res) {
    const body = req.user;
    console.log("body in handle me");
    console.log(body);
    if (!req.user) return res.json({ isLoggedIn: false });

    return res.json({ isLoggedIn: true, user: req.user });

}





module.exports = { handleSignUp, handleSignIn, handleMe };

