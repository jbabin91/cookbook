const express = require('express');

const RecipeIngredient = require('./recipeIngredient.model');
const jwtVerify = require('../../../src/lib/authFunctions');
const verifyToken = require('../../../src/middleware/verifyToken');

const router = express.Router();

//TODO: Create
//TODO: Update

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
 *      description: An array of all ingredient objects
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
 *     type: double
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
    jwtVerify(token);

    const recipeIngredients = await RecipeIngredient.query()
      .select('id', 'amount', 'Recipe_id', 'Ingredient_id', 'Measurement_id', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json({ recipeIngredients });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /recipeIngredient/{recipeId}:
 *   get:
 *    summary: Gets ingredients for a single recipe
 *    tags: [RecipeIngredient]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: recipeId
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the recipe to associate the recipeIngredient
 *    responses:
 *     200:
 *      description: An array of ingredients for a recipe
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
 *     type: double
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
router.get('/:recipeId', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    jwtVerify(token);

    const recipeIngredients = await RecipeIngredient.query()
      .select('id', 'amount', 'Recipe_id', 'Ingredient_id', 'Measurement_id', 'created_at', 'updated_at')
      .where('Recipe_id', req.params.recipeId)
      .where('deleted_at', null);

    res.json({ recipeIngredients });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /recipeIngredient/{id}:
 *   delete:
 *    summary: Deletes a Recipe Ingredient by id
 *    tags: [RecipeIngredient]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: A recipeIngredient object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/recipeIngredient'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  recipeIngredient:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    amount:
 *     type: double
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
 *    deleted_at:
 *     type: string
 */
router.delete('/:id', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    jwtVerify(token, 'delete');

    const recipeIngredient = await RecipeIngredient.query()
      .where('id', req.params.id)
      .update({ updated_at: 'now()', deleted_at: 'now()' })
      .returning(['id', 'amount', 'Recipe_id', 'Ingredient_id', 'Measurement_id', 'created_at', 'updated_at', 'deleted_at'])
      .first();

    res.json({ recipeIngredient });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
