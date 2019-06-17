const ApiError = require('../services/apiError');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.postSignUp = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password)
      throw new ApiError('Missing field', 400, 'One or more fields are missing.');

    if (await User.findOne({ email }))
      throw new ApiError('Email registered', 400, 'The email is already in use.');

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

    if (!email || !password)
      throw new ApiError('Missing field', 400, 'One or more fields are missing.');

    const user = await User.findOne({ email }).select('+password');

    if (!user)
      throw new ApiError('User not found', 400, 'The email you entered is not registered.');

    let isEqual;
    if (user) isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) throw new ApiError('Bad password', 400, 'The password you entered is incorrect.');

    const token = user.getToken();

    return res.status(200).json({ userId: user._id, token: token });
  } catch (error) {
    next(error);
  }
};
