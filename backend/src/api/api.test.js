const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

require('dotenv').config();

const { mock, setupMock, initMock, teardownMock } = require('../../test/testFunctions');
const project = require('../constants/project');

chai.use(chaiHttp);

const SERVER_URL = process.env.APP_URL || 'http://localhost:3000';

describe('API', () => {
  before(async () => await initMock());

  after(() => {
    teardownMock();
  });

  beforeEach(() => (mock.requests = []));

  it('should return a message', (done) => {
    setupMock(200, { result: 'valid' });

    chai
      .request(SERVER_URL)
      .get('/api/v1')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          chai.expect(res.body.message).to.equal(project.message);
          done();
        }
      });
  });
});
