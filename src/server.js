const MONGODB = 'mongodb://localhost:27017/vttr';

const http = require('http');
const mongoose = require('mongoose').set('debug', true);
mongoose.set('useCreateIndex', true);

const app = require('./app');
const server = http.createServer(app);

mongoose.connect(MONGODB, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('connected to databse'))
  .on('error', error => console.warn('error: ' + error));

server.listen(3000, () => {
  console.log('server listening on port 3000...');
});

module.exports = server;
