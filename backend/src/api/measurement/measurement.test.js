const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/measurement', () => {
  it('should respond with an array of measurements', async () => {
    const response = await supertest(app).get('/api/v1/measurement').expect('Content-Type', /json/).expect(200);

    expect(response.body.length.toBeGreaterThan(0));
  });
});
