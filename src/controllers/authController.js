const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../models/user');

exports.postSignUp = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      const error = new Error('Por favor preencha todos os campos.');
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
