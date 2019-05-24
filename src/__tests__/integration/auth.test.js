const factory = require('../factory');
const app = require('../../app');
const request = require('supertest');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/vuttrtest';

mongoose.connect(mongoDB, { useNewUrlParser: true });

describe('Auth test', () => {
  beforeEach(done => {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteOne({});
    }

    return done();
  });

  afterAll(done => {
    mongoose.connection.close();
    return done();
  });

  describe('test auth routes', () => {
    describe('/signup', () => {
      it('sign up a user', async () => {
        await request(app)
          .post('/signup')
          .send({ name: 'Leo', lastName: 'Motta', email: 'test2@test.com', password: '123456' })
          .expect(201);
      });

      it('refuse user already created', async () => {
        const user = await factory.create('User');

        await request(app)
          .post('/signup')
          .send({ name: user.name, lastName: user.lastName, email: user.email, password: '123456' })
          .expect(400);
      });

      it('missing field', async () => {
        await request(app)
          .post('/signup')
          .send({ name: 'Leo' })
          .expect(400);
      });
    });

    describe('/signin', () => {
      it('Sign In a user', async () => {
        const user = await factory.create('User', { password: '123456' });

        await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' })
          .expect(200);
      });

      it('Bad password', async () => {
        const user = await factory.create('User');

        await request(app)
          .post('/signin')
          .send({ email: user.email, password: '1234536' })
          .expect(400);
      });

      it('Field is missing', async () => {
        await request(app)
          .post('/signin')
          .send({ email: 'test3@test.com' })
          .expect(400);
      });
    });
  });
});
