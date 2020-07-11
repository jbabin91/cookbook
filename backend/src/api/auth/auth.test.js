const app = require('../../app');
const request = require('supertest')(app);

const loginUser = require('../../lib/testFunctions');

let token;

describe('POST /api/v1/auth/signin', () => {
  it('should respond with an array of user info', async () => {
    const response = await request
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jbabin91@gmail.com',
        password: 'Test123!',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length.toBeGreaterThan(0));
  });
});
