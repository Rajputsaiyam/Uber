const JWT = require('jsonwebtoken');
const User = require('../models/user.models');
const hash = require('../utils/hash');
const AppError = require('../error/app.error');
const crypto = require('crypto');

JWT_SECRET_KEY = "$a!yam@2005"
//const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// if(!JWT_SECRET_KEY || JWT_SECRET_KEY === ''){
//     throw new Error('Forget to set JWT_SECRET_KEY into your environment file');
// }

class AuthService {
    /**
     * @function generateUserToken
     * @param {{_id:string, role:'admin'|'user'}} payload 
     * @returns {string} JWT Signed token
    */
    static generateUserToken(payload) {
        console.log("Generating user token");
        console.log(payload);
        const token = JWT.sign(payload, JWT_SECRET_KEY);
        console.log(token);
        return token;
    }

    /**
     * @function signupWithEmailAndPassword
     * @param {{firstname:string, lastname?:string, email:string, password:string}} data 
     * @returns {Promise<string>}
    */
    static async signupWithEmailAndPassword(data) {
        const { firstName, lastName, email, password } = data;
        console.log("in user service");
        console.log(data);
        const salt = crypto.randomBytes(16).toString('hex');

        try {
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hash(password, salt),
                salt,
            });

            const token = AuthService.generateUserToken({ id: user._id, role: user.role }) //Payload
            return token;

        } catch (err) {
            if (err.code === 11000) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * @function signinWithEmailAndPassword
     * @param {{email:string, password:string}} data 
     * @returns {Promise<string>}
    */
    static async signinWithEmailAndPassword(data) {
        console.log(data);
        const { email, password } = data;
        console.log(password);
        console.log(data);
        const userInDB = await User.findOne({ email: email });
        console.log(userInDB);
        if (!userInDB) throw new AppError(`User with email ${email} does not exist`);

        const hashPassword = hash(password, userInDB.salt);
        console.log("HELLO");
        console.log(hashPassword);

        if (hashPassword !== userInDB.password) throw new AppError(`Invalid email id or password`);

        const token = AuthService.generateUserToken({
            _id: userInDB._id, role: userInDB.role
        });

        return token;
    }

    static async decodeUserToken(token) {
        try {
            const payload = JWT.verify(token, JWT_SECRET_KEY);
            return payload;
        } catch (e) {
            return false;
        }
    }
}

module.exports = AuthService;