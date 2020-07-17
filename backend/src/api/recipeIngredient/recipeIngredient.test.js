const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

require('dotenv').config();

chai.use(chaiHttp);

const { initMock, mock, setupMock, teardownMock } = require('../../test/testFunctions');

const SERVER_URL = process.env.APP_URL || 'http://localhost:3000';

let testUser = {
  email: 'test@test.com',
  password: 'Test123!',
};

let token;

describe('RecipeIngredient', () => {
  before(async () => await initMock());
  before((done) => {
    chai
      .request(SERVER_URL)
      .post('/api/v1/auth/signin')
      .send(testUser)
      .end((err, res) => {
        if (err) throw err;
        chai.expect(res.statusCode).to.equal(200);
        token = res.body.token;
        done();
      });
  });

  after(() => {
    teardownMock();
  });

  beforeEach(() => (mock.requests = []));

  describe('GET /api/v1/recipeIngredient', () => {
    it('should get an array of recipeIngredients.', (done) => {
      setupMock(200, { result: 'valid' });
      chai
        .request(SERVER_URL)
        .get('/api/v1/measurement')
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          if (err) throw err;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
