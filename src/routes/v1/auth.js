const express = require('express');
const router = express.Router();

const isAuth = require('../../middlewares/isAuth');

const passport = require('passport');
require('../../middlewares/passport')(passport);

module.exports = router;
