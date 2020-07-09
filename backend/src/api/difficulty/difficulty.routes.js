const express = require('express');

const Difficulty = require('./difficulty.model');
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
    const difficulties = await Difficulty.query().select('id', 'name', 'created_at', 'updated_at').where('deleted_at', null);
    res.json(difficulties);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
