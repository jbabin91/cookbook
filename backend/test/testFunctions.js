const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

require('dotenv').config();

const SERVER_URL = process.env.APP_URL || 'http://localhost:3000';
const MOCK_SERVER_PORT = process.env.MOCK_SERVER_PORT || 3002;

chai.use(chaiHttp);

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

module.exports = {
  initMock,
  mock,
  setupMock,
  teardownMock,
};
