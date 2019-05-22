// Built in node
const http = require('http');

// Third part libs
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');

// Require Routes

const app = express();
const server = http.createServer(app);

// Middlerwares
app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-sud5s.mongodb.net/${
      process.env.DB_NAME
    }`,
    { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }
  )
  .then(result => {
    server.listen(process.env.PORT || 8080, () => {
      console.log(`App listening on port ${process.env.PORT || 8080}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
