const express = require('express');

const Admin = require('../admin/admin.model');
const Recipe = require('./Recipe.model');
const jwt = require('../../lib/jwt');
const verifyToken = require('../../../src/middleware/verifyToken');
const { errorTypes, errorMessages } = require('../../../src/middleware/errors');

const router = express.Router();

//TODO: Create
//TODO: Update

/**
 * @swagger
 * paths:
 *  /recipe:
 *   get:
 *    summary: Gets all recipes
 *    tags: [Recipe]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: An array of recipe objects
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/recipes'
 *     403:
 *      description: Error when submitting a new user
 * definitions:
 *  recipes:
 *   type: array
 *   items:
 *    $ref: '#/definitions/recipe'
 *  recipe:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    title:
 *     type: string
 *    prepTime:
 *     type: double
 *    cookTime:
 *     type: double
 *    rating:
 *     type: double
 *    servingSize:
 *     type: double
 *    recipePreparation:
 *     type: string
 *    MealType_id:
 *     type: integer
 *    Difficulty_id:
 *     type: integer
 *    User_id:
 *     type: integer
 *    created_at:
 *     type: string
 *    updated_at:
 *     type: string
 */
router.get('/', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    const jwtResponse = await jwt.verify(token);

    if (jwtResponse.error) {
      throw jwtResponse.error;
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

/**
 * @swagger
 * paths:
 *  /recipe/{id}:
 *   get:
 *    summary: Gets a single recipe by id
 *    tags: [Recipe]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Recipe ID
 *    responses:
 *     200:
 *      description: A recipe object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/recipe'
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  recipe:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    title:
 *     type: string
 *    prepTime:
 *     type: double
 *    cookTime:
 *     type: double
 *    rating:
 *     type: double
 *    servingSize:
 *     type: double
 *    recipePreparation:
 *     type: string
 *    MealType_id:
 *     type: integer
 *    Difficulty_id:
 *     type: integer
 *    User_id:
 *     type: integer
 *    created_at:
 *     type: string
 *    updated_at:
 *     type: string
 */
router.get('/:id', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    const jwtResponse = await jwt.verify(token);

    if (jwtResponse.error) {
      throw jwtResponse.error;
    }

    const recipe = await Recipe.query()
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
      .where('id', req.params.id)
      .where('deleted_at', null)
      .first();

    res.json({ recipe });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /recipe/{id}:
 *   delete:
 *    summary: Deletes a recipe by id
 *    tags: [Recipe]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Recipe ID
 *    responses:
 *     200:
 *      description: A recipe object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/recipe'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  recipe:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    title:
 *     type: string
 *    prepTime:
 *     type: double
 *    cookTime:
 *     type: double
 *    rating:
 *     type: double
 *    servingSize:
 *     type: double
 *    recipePreparation:
 *     type: string
 *    MealType_id:
 *     type: integer
 *    Difficulty_id:
 *     type: integer
 *    User_id:
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
    const jwtResponse = await jwt.verify(token);

    if (jwtResponse.error) {
      throw jwtResponse.error;
    }

    const admin = await Admin.query().select('delete').where({ User_id: jwtResponse.payload.id }).first();

    if (!admin || admin.delete === false) {
      const error = new Error(errorMessages.ForbiddenError);
      res.status(errorTypes.UnAuthorizedError);
      throw error;
    }

    const recipe = await Recipe.query()
      .where('id', req.params.id)
      .update({ updated_at: 'now()', deleted_at: 'now()' })
      .returning([
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
        'deleted_at',
      ])
      .first();

    res.json({ recipe });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
