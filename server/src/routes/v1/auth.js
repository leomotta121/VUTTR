const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authController');

// /signup
router.post('/signup', authController.postSignUp);

// /signin
router.post('/signin', authController.postSignIn);

module.exports = router;
