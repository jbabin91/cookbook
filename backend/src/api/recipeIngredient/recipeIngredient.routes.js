const express = require('express');

const RecipeIngredient = require('./recipeIngredient.model');
const jwt = require('../../lib/jwt');
const verifyToken = require('../../../src/middleware/verifyToken');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /recipeIngredient:
 *   get:
 *    summary: Gets all ingredients for all recipes
 *    tags: [RecipeIngredient]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: An object with a user object and a token
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/recipeIngredients'
 *     403:
 *      description: You don't have permission to access this url.
 *
 * definitions:
 *  recipeIngredients:
 *   type: array
 *   items:
 *    $ref: '#/definitions/recipeIngredient'
 *  recipeIngredient:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    amount:
 *     type: number
 *    Recipe_id:
 *     type: integer
 *    Ingredient_id:
 *     type: integer
 *    Measurement_id:
 *     type: integer
 *    created_at:
 *     type: string
 *    updated_at:
 *     type: string
 */
router.get('/', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    const error = await jwt.verify(token);

    if (error) {
      throw error;
    }

    const recipeIngredients = await RecipeIngredient.query()
      .select('id', 'amount', 'Recipe_id', 'Ingredient_id', 'Measurement_id', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json(recipeIngredients);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /recipeIngredient/{id}:
 *   get:
 *    summary: Gets ingredients for a single recipe
 *    tags: [RecipeIngredient]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the recipe to associate the recipeIngredient
 *    responses:
 *     200:
 *      description: An object with a user object and a token
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/recipeIngredients'
 *     403:
 *      description: You don't have permission to access this url.
 *
 * definitions:
 *  recipeIngredients:
 *   type: array
 *   items:
 *    $ref: '#/definitions/recipeIngredient'
 *  recipeIngredient:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    amount:
 *     type: number
 *    Recipe_id:
 *     type: integer
 *    Ingredient_id:
 *     type: integer
 *    Measurement_id:
 *     type: integer
 *    created_at:
 *     type: string
 *    updated_at:
 *     type: string
 */
router.get('/:id', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    const error = await jwt.verify(token);

    if (error) {
      throw error;
    }

    const recipeIngredients = await RecipeIngredient.query()
      .select('id', 'amount', 'Recipe_id', 'Ingredient_id', 'Measurement_id', 'created_at', 'updated_at')
      .where('Recipe_id', req.params.id)
      .where('deleted_at', null);
    res.json(recipeIngredients);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
