const express = require('express');

const project = require('../constants/project');

const auth = require('./auth/auth.routes');
const difficulty = require('./difficulty/difficulty.routes');
const mealType = require('./mealType/mealType.routes');
const measurement = require('./measurement/measurement.routes');
const recipe = require('./recipe/recipe.routes');
const recipeIngredient = require('./recipeIngredient/recipeIngredient.routes');
const users = require('./users/users.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/auth', auth);
router.use('/difficulty', difficulty);
router.use('/mealType', mealType);
router.use('/measurement', measurement);
router.use('/recipe', recipe);
router.use('/recipeIngredient', recipeIngredient);
router.use('/users', users);

module.exports = router;
