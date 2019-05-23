// Third part libs
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();

// Require Routes
const v1 = require('./routes/v1');

// Middlerwares
app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

// Catch 404
app.use((req, res, next) => {
  const error = new Error('Route not found.');
  error.status = 404;
  next(error);
});

// Catch errors
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({ message: message, status: status });
});

module.exports = app;
