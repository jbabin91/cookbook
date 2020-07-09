const express = require('express');

const Measurement = require('./measurement.model');
const jwt = require('../../lib/jwt');
const verifyToken = require('../../../src/middleware/verifyToken');

const router = express.Router();

router.get('/', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    const error = await jwt.verify(token);

    if (error) {
      throw error;
    }

    const measurements = await Measurement.query()
      .select('id', 'type', 'unit', 'abbreviation', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json(measurements);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
