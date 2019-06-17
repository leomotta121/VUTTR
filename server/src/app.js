require('dotenv').config({
  path: '../.env'
});

const ApiError = require('./services/apiError');

// Third part libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

// Require Routes
const v1 = require('./routes/v1');

const app = express();

// Middlerwares
app.use(cors());

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(v1);

// Catch 404
app.use((req, res, next) => {
  const error = new ApiError('Not found', 404, 'Route not found.');
  next(error);
});

// Catch errors
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, status: status });
});

module.exports = app;
