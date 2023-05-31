const express = require('express');
const router = express.Router();
const SignupController = require('../Controller/SignupController');
const LoginController = require('../Controller/LoginController');

// Endpoint for user signup
router.post('/signup', SignupController.signup);

// Endpoint for verification
router.post('/verify', SignupController.verify);
router.post('/login',LoginController.login);

module.exports = router;
