const factory = require('../factory');
const app = require('../../app');
const User = require('../../models/user');
const Tool = require('../../models/tool');
const request = require('supertest');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/vuttrtest';

mongoose.connect(mongoDB, { useNewUrlParser: true });

describe('Tool test', () => {
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

  describe('test tools routes', () => {
    describe('creat tool', () => {
      it('register a tool', async () => {
        const user = await factory.create('User', { password: '123456' });

        const response = await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' });

        const token = response.body.token;

        await request(app)
          .post('/tools')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'express',
            link: 'https://expressjs.com/',
            description:
              'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
            tags: ['node', 'framework']
          })
          .expect(201);
      });

      it('missing field', async () => {
        const user = await factory.create('User', { password: '123456' });

        const response = await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' });

        const token = response.body.token;

        await request(app)
          .post('/tools')
          .set('Authorization', `Bearer ${token}`)
          .send({
            link: 'https://expressjs.com/',
            description:
              'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
            tags: ['node', 'framework']
          })
          .expect(400);
      });

      it('registered tool', async () => {
        const user = await factory.create('User', { password: '123456' });

        const tool = await factory.create('Tool');

        const response = await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' });

        const token = response.body.token;

        await request(app)
          .post('/tools')
          .set('Authorization', `Bearer ${token}`)
          .send(tool)
          .expect(400);
      });
    });

    describe('/delete', () => {
      it('delete a tool', async () => {
        const user = await factory.create('User', { password: '123456' });

        const signedUser = await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' });

        const token = signedUser.body.token;

        const tool = await factory.create('Tool');

        await request(app)
          .delete(`/tools/${tool._id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200);
      });

      it('tool not registered', async () => {
        const user = await factory.create('User', { password: '123456' });

        const signedUser = await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' });

        const token = signedUser.body.token;

        await request(app)
          .delete('/tools/5ce7baf17b521d2b0c21d0b6')
          .set('Authorization', `Bearer ${token}`)
          .expect(400);
      });
    });

    describe('/tools', () => {
      it('Fetch all tools', async () => {
        await request(app)
          .get('/tools')
          .expect(200);
      });

      it('Fetch all tools by tag', async () => {
        const tool = await factory.create('Tool');

        await request(app)
          .get(`/tools?tag=${tool.tags[0]}`)
          .expect(200);
      });

      it('Could not find any tool.', async () => {
        await request(app)
          .get('/tools?tag=node')
          .expect(400);
      });
    });
  });
});
