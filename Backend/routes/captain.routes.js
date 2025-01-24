const express = require('express');
const captainController = require('../controllers/captain.controllers');

const router = express.Router();

router.post('/sign-up', captainController.handleSignUp);
router.post('/sign-in', captainController.handleSignIn);
router.get('/me', captainController.handleMe);

module.exports = router;