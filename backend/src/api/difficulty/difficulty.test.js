const app = require('../../app');
const request = require('supertest')(app);

const loginUser = require('../../lib/testFunctions');

let token;

describe('GET /api/v1/difficulty', () => {
  it('should require authorization', async () => {
    request.get('/api/v1/difficulty').expect('Content-Type', /json/).expect(403);
  });

  token = loginUser();

  it('should respond with an array of difficulty levels', async () => {
    const response = await request
      .get('/api/v1/difficulty')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.length.toBeGreaterThan(0));
  });
});
