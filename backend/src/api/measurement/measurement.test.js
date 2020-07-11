const app = require('../../app');
const request = require('supertest')(app);

const loginUser = require('../../lib/testFunctions');

describe('GET /api/v1/measurement', () => {
  it('should require authorization', async () => {
    request
      .get('/api/v1/difficulty')
      .expect(403)
      .end((err, res) => {
        if (err) return err;
      });
  });

  var auth = {};
  loginUser(auth);

  it('should respond with an array of measurements', async () => {
    const response = await request.get('/api/v1/measurement').expect('Content-Type', /json/).expect(200);

    expect(response.body.length.toBeGreaterThan(0));
  });
});
