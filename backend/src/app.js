const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const api = require('./api');
const middleware = require('./middleware/errors');
const project = require('./constants/project');
const swagger = require('./swagger/index');

const app = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

app.use('/api/v1', api);

app.use('/docs', swagger);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

module.exports = app;
