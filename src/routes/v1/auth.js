const express = require('express');
const router = express.Router();

const isAuth = require('../../middlewares/isAuth');

const authController = require('../../controllers/authController');

const passport = require('passport');
require('../../middlewares/passport')(passport);

// /v1/auth/test
router.get('/test', authController.getTest);

// /v1/auth/signup
router.post('/signup', authController.postSignUp);

module.exports = router;
