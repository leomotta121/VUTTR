const http = require('http');
const mongoose = require('mongoose').set('debug', true);
mongoose.set('useCreateIndex', true);

const app = require('./app');
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection
  .once('open', () => console.log('connected to databse'))
  .on('error', error => console.warn('error: ' + error));

server.listen(process.env.PORT || 3000, () => {
  console.log(`listening on ${process.env.PORT || 3000}`);
});

module.exports = {
  server: server,
  mongoose: mongoose
};
