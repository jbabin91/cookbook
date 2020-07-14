const express = require('express');

const RecipeIngredient = require('./recipeIngredient.model');
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

    const recipeIngredients = await RecipeIngredient.query()
      .select('id', 'type', 'unit', 'abbreviation', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json(recipeIngredients);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
