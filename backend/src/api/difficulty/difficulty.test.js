const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/difficulty', () => {
  it('should respond with an array of difficulty levels', async () => {
    const response = await supertest(app).get('/api/v1/difficulty').expect('Content-Type', /json/).expect(200);

    expect(response.body.length.toBeGreaterThan(0));
  });
});
