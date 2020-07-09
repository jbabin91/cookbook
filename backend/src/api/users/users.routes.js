const express = require('express');

const User = require('./users.model');
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

    const users = await User.query()
      .select('id', 'GUID', 'email', 'firstName', 'lastName', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
