let User = require('../src/api/users/users.model');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const faker = require('faker');

require('dotenv').config();

const SERVER_URL = process.env.APP_URL || 'http://localhost:3000';
const MOCK_SERVER_PORT = process.env.MOCK_SERVER_PORT || 3002;

chai.use(chaiHttp);

const TEST_USER = {
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phoneNumber: faker.phone.phoneNumber(),
  password: 'Test123!',
};

const mock = {
  app: express(),
  server: null,
  requests: [],
  status: 404,
  responseBody: {},
};

const setupMock = (status, body) => {
  mock.status = status;
  mock.responseBody = body;
};

const initMock = async () => {
  mock.app.use(bodyParser.urlencoded({ extended: false }));
  mock.app.use(bodyParser.json());
  mock.app.use(cors());
  mock.app.get('*', (req, res) => {
    mock.requests.push(req);
    res.status(mock.status).send(mock.responseBody);
  });

  mock.server = await mock.app.listen(MOCK_SERVER_PORT);
};

const teardownMock = () => {
  if (mock.server) {
    mock.server.close();
    delete mock.server;
  }
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
