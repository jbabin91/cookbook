const express = require('express');

const MealType = require('./mealType.model');
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
    const mealTypes = await MealType.query().select('id', 'name', 'created_at', 'updated_at').where('deleted_at', null);
    res.json(mealTypes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
