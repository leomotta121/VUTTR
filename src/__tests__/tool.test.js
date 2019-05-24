const app = require('../app');
const User = require('../models/user');
const Tool = require('../models/tool');
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

  describe('test /v1/tool/... routes', () => {
    describe('/register', () => {
      it('register a tool', async () => {
        const user = new User({
          name: 'Diane',
          lastName: 'Castro',
          email: 'test@test.com',
          password: '123456'
        });
        await user.save();

        const response = await request(app)
          .post('/v1/auth/signin')
          .send({ email: user.email, password: '123456' });

        const token = response.body.token;

        await request(app)
          .post('/v1/tool/register')
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
        const user = new User({
          name: 'Diane',
          lastName: 'Castro',
          email: 'test5@test.com',
          password: '123456'
        });
        await user.save();

        const response = await request(app)
          .post('/v1/auth/signin')
          .send({ email: user.email, password: '123456' });

        const token = response.body.token;

        await request(app)
          .post('/v1/tool/register')
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
        const user = new User({
          name: 'Diane',
          lastName: 'Castro',
          email: 'test5@test.com',
          password: '123456'
        });
        await user.save();

        const express = {
          title: 'express',
          link: 'https://expressjs.com/',
          description:
            'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
          tags: ['node', 'framework']
        };
        const expressTool = new Tool(express);
        expressTool.save();

        const response = await request(app)
          .post('/v1/auth/signin')
          .send({ email: user.email, password: '123456' });

        const token = response.body.token;

        await request(app)
          .post('/v1/tool/register')
          .set('Authorization', `Bearer ${token}`)
          .send(express)
          .expect(400);
      });
    });

    describe('/delete', () => {
      it('delete a tool', async () => {
        const user = new User({
          name: 'Diane',
          lastName: 'Castro',
          email: 'test@test.com',
          password: '123456'
        });
        await user.save();

        const signedUser = await request(app)
          .post('/v1/auth/signin')
          .send({ email: user.email, password: '123456' });

        const token = signedUser.body.token;

        const tool = await request(app)
          .post('/v1/tool/register')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'hotel',
            link: 'https://github.com/typicode/hotel',
            description:
              'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
            tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
          });

        const toolId = tool.body._id;

        await request(app)
          .delete('/v1/tool/delete')
          .set('Authorization', `Bearer ${token}`)
          .send({ id: toolId })
          .expect(200);
      });

      it('missing id', async () => {
        const user = new User({
          name: 'Diane',
          lastName: 'Castro',
          email: 'test@test.com',
          password: '123456'
        });
        await user.save();

        const signedUser = await request(app)
          .post('/v1/auth/signin')
          .send({ email: user.email, password: '123456' });

        const token = signedUser.body.token;

        await request(app)
          .delete('/v1/tool/delete')
          .set('Authorization', `Bearer ${token}`)
          .send({})
          .expect(400);
      });
    });

    describe('/tools', () => {
      it('Fetch all tools', async () => {
        await request(app)
          .get('/v1/tool/tools')
          .expect(200);
      });

      it('Fetch all tools by tag', async () => {
        const expressTool = new Tool({
          title: 'express',
          link: 'https://expressjs.com/',
          description:
            'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
          tags: ['node', 'framework']
        });
        expressTool.save();

        await request(app)
          .get('/v1/tool/tools?tag=node')
          .expect(200);
      });

      it('Could not find any tool.', async () => {
        await request(app)
          .get('/v1/tool/tools?tag=node')
          .expect(400);
      });
    });
  });
});
