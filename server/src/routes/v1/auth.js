const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authController');

// /v1/auth/signup
router.post('/signup', authController.postSignUp);

// /v1/auth/signin
router.post('/signin', authController.postSignIn);

module.exports = router;
