const faker = require('faker');
const factory = require('factory-girl').factory;
const User = require('../models/user');
const Tool = require('../models/tool');

factory.define('User', User, {
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

factory.define('Tool', Tool, {
  title: faker.lorem.word(),
  link: faker.internet.url(),
  description: faker.lorem.words(5),
  tags: [faker.lorem.word(), faker.lorem.word()]
});

module.exports = factory;
