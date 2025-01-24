const express = require('express');
const authuserController = require('../controllers/user.controllers');

const router = express.Router();

router.post('/sign-up', authuserController.handleSignUp);
router.post('/sign-in', authuserController.handleSignIn);
router.get('/me', authuserController.handleMe);

module.exports = router;