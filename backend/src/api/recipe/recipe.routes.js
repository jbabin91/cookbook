const express = require('express');

const Recipe = require('./Recipe.model');
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

    const recipes = await Recipe.query()
      .select(
        'id',
        'title',
        'prepTime',
        'cookTime',
        'rating',
        'servingSize',
        'recipePreparation',
        'MealType_id',
        'Difficulty_id',
        'User_id',
        'created_at',
        'updated_at',
      )
      .where('deleted_at', null);
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
