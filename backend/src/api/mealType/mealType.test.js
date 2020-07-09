const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/mealType', () => {
  it('should respond with an array of mealTypes', async () => {
    const response = await supertest(app).get('/api/v1/mealType').expect('Content-Type', /json/).expect(200);

    expect(response.body.length.toBeGreaterThan(0));
  });
});
