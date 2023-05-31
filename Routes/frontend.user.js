const express = require('express');
const router = express.Router();
const LoginController = require('../Controller/LoginController');
const SignupController = require('../Controller/FrontEndController/SignupController');


router.get('/signup',SignupController.signup);
router.get('/verify',SignupController.verify);

module.exports = router;