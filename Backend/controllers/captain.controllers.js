const {
  captainSignupValidationSchema,
  captainSigninValidationSchema
} = require('../lib/validators/captain.validators');
const CaptainService = require('../service/captain.service');
const Captain = require('../models/captain.models');
const AuthError = require('../error/app.error');
const JWT = require('jsonwebtoken');

async function handleSignUp(req, res) {
  const body = req.body;
  console.log(body);
  const validationResult = await captainSignupValidationSchema.safeParseAsync(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { firstname, lastname, email, password, vehicle, location } = validationResult.data;

  const isCaptainAlreadyExist = await Captain.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(400).json({ error: 'Captain already exists' });
  }

  try {
    const token = await CaptainService.signupWithEmailAndPassword({
      firstname,
      lastname,
      email,
      password,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
      lat: location.lat,
      lon: location.lon
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
  const validationResult = await captainSigninValidationSchema.safeParseAsync(req.body);
  console.log(validationResult.data);
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { email, password } = validationResult.data;
  console.log(password);
  try {
    const token = await CaptainService.signinWithEmailAndPassword({ email, password });
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

