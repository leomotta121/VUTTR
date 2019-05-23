const MONGODB = 'mongodb://localhost:27017/vuttr';
const port = 3000;

const http = require('http');
const mongoose = require('mongoose').set('debug', true);
mongoose.set('useCreateIndex', true);

const app = require('./app');
const server = http.createServer(app);

mongoose.connect(MONGODB, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection
  .once('open', () => console.log('connected to databse'))
  .on('error', error => console.warn('error: ' + error));

server.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = {
  server: server,
  mongoose: mongoose
};
