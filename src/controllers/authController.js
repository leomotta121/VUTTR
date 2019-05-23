const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../models/user');

exports.postSignUp = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      const error = new Error('Required field is missing.');
      error.status = 400;
      throw error;
    }

    if (await User.findOne({ email })) {
      const error = new Error('Email registered.');
      error.status = 400;
      throw error;
    }

    const user = await User.create({
      name: name,
      lastName: lastName,
      email: email,
      password: password
    });

    user.save();

    return res.status(201).json({
      message: 'User created.'
    });
  } catch (error) {
    next(error);
  }
};

exports.postSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Required field is missing.');
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ email }).select('+password');

    let isEqual;
    if (user) {
      isEqual = await bcrypt.compare(password, user.password);
    }

    if (!user || !isEqual) {
      const error = new Error('Invalid password.');
      error.status = 400;
      throw error;
    }

    const token = user.getToken();

    return res.status(200).json({ userId: user._id, token: token });
  } catch (error) {
    next(error);
  }
};
