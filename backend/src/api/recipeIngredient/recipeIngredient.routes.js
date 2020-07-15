const express = require('express');

const RecipeIngredient = require('./recipeIngredient.model');
const jwt = require('../../lib/jwt');
const verifyToken = require('../../../src/middleware/verifyToken');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /recipeIngredient:         # path of the user from your endpoint
 *    post:              # endpoint request type (put request)
 *      summary: Signs up a new user
 *      tags: [RecipeIngredient]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/signup'
 *      responses:
 *        200:
 *          description: An object with a user object and a token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/signupResponse'
 *        403:
 *          description: Error when submitting a new user
 * definitions:        # Schema definition for the request body
 *   signup:
 *    type: object
 *    properties:
 *      email:
 *        type: string
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      phoneNumber:
 *        type: string
 *      password:
 *        type: string
 *   signupResponse:
 *    type: object
 *    properties:
 *      user:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          GUID:
 *            type: string
 *          email:
 *            type: string
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          phoneNumber:
 *            type: string
 *      token:
 *        type: string
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
 *    get:
 *      summary: Gets ingredients for a single recipe
 *      tags: [RecipeIngredient]
 *      parameters:
 *        - in: header
 *          name: authorization
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer <token>
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the recipe to associate the recipeIngredient
 *      responses:
 *        200:
 *          description: An object with a user object and a token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/signupResponse'
 *        403:
 *          description: You don't have permission to access this url.
 *
 * definitions:
 *   signup:
 *    type: object
 *    properties:
 *      email:
 *        type: string
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      phoneNumber:
 *        type: string
 *      password:
 *        type: string
 *   signupResponse:
 *    type: object
 *    properties:
 *      user:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          GUID:
 *            type: string
 *          email:
 *            type: string
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          phoneNumber:
 *            type: string
 *      token:
 *        type: string
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
