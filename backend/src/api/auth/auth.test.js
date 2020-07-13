const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const faker = require('faker');

require('dotenv').config();

chai.use(chaiHttp);

const { mock, setupMock, initMock, teardownMock } = require('../../../test/testFunctions');

const SERVER_URL = process.env.APP_URL || 'http://localhost:3000';

const TEST_USER = {
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phoneNumber: faker.phone.phoneNumber(),
  password: 'Test123!',
};

let token;

let testUser = {
  email: '',
  password: '',
};

describe('Auth', () => {
  before(async () => await initMock());

  after(() => {
    teardownMock();
  });

  beforeEach(() => (mock.requests = []));

  it('should create a new user', (done) => {
    setupMock(200, { result: 'valid' });

    chai
      .request(SERVER_URL)
      .post('/api/v1/auth/signup')
      .send(TEST_USER)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          res.body.should.have.property('token');
          testUser.email = TEST_USER.email;
          testUser.password = TEST_USER.password;
          done();
        }
      });
  });

  it('should authorize the test user and return a token', (done) => {
    setupMock(200, { result: 'valid' });

    chai
      .request(SERVER_URL)
      .post('/api/v1/auth/signin')
      .send(testUser)
      .end((err, res) => {
        if (err) throw err;
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  // describe('GET /users', () => {
  //   it('should get an array of users', (done) => {
  //     setupMock(200, { result: 'valid' });

  //     chai
  //       .request(SERVER_URL)
  //       .get('/api/v1/users')
  //       .set({ authorization: `Bearer ${token}` })
  //       .end((err, res) => {
  //         if (err) throw err;
  //         res.should.have.status(200);
  //         res.body.should.be.a('array');
  //         done();
  //       });
  //   });
  // });
});
