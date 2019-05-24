const app = require('../../app');
const request = require('supertest');

describe('App.js test', () => {
  it('Has a module', () => {
    expect(app).toBeDefined();
  });

  let server;

  beforeAll(() => {
    server = app.listen(3000, () => console.log('listening port 3000'));
  });

  afterAll(done => {
    server.close();
    return done();
  });

  describe('error handling tests', () => {
    it('gets 404 & gets to error handling', async () => {
      await request(server)
        .get('/unknown')
        .expect(404);
    });
  });
});
