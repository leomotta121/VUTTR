const factory = require('../factory');
const app = require('../../app');
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
    describe('Will test [POST] /tools', () => {
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

    describe('will test [DELETE] /tools', () => {
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

      it('will not find tool not registered', async () => {
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

    describe('will test [PATCH] /tools/:id', () => {
      it('will patch a tool', async () => {
        const user = await factory.create('User', { password: '123456' });

        const signedUser = await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' });

        const token = signedUser.body.token;

        const tool = await factory.create('Tool');

        await request(app)
          .patch(`/tools/${tool._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'express',
            link: 'https://expressjs.com/',
            description:
              'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
            tags: ['node', 'framework']
          })
          .expect(200);
      });

      it('will not update tool, missing all fields', async () => {
        const user = await factory.create('User', { password: '123456' });

        const signedUser = await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' });

        const token = signedUser.body.token;

        const tool = await factory.create('Tool');

        await request(app)
          .patch(`/tools/${tool._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({})
          .expect(400);
      });

      it('tags most be an array', async () => {
        const user = await factory.create('User', { password: '123456' });

        const signedUser = await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' });

        const token = signedUser.body.token;

        const tool = await factory.create('Tool');

        await request(app)
          .patch(`/tools/${tool._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            tags: 'node'
          })
          .expect(400);
      });

      it('wrong id, tool not registered', async () => {
        const user = await factory.create('User', { password: '123456' });

        const signedUser = await request(app)
          .post('/signin')
          .send({ email: user.email, password: '123456' });

        const token = signedUser.body.token;

        await request(app)
          .patch(`/tools/5cec64a057f604001f5566c4`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            tags: ['node']
          })
          .expect(400);
      });
    });

    describe('will test [GET] /tools', () => {
      it('Fetch all tools', async () => {
        await request(app)
          .get('/tools')
          .expect(200);
      });

      it('Fetch all tools by tag [GET] /tools?tag=tag', async () => {
        const tool = await factory.create('Tool');

        await request(app)
          .get(`/tools?tag=${tool.tags[0]}`)
          .expect(200);
      });

      it('Could not find any tool. [GET] /tools?tag=tag', async () => {
        await request(app)
          .get('/tools?tag=node')
          .expect(400);
      });
    });
  });
});
