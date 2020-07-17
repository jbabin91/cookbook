const express = require('express');

const MealType = require('./mealType.model');
const jwtVerify = require('../../../src/lib/authFunctions');
const verifyToken = require('../../../src/middleware/verifyToken');

const router = express.Router();

//TODO: Create
//TODO: Update

/**
 * @swagger
 * paths:
 *  /mealType:
 *   get:
 *    summary: Returns all MealTypes
 *    tags: [MealType]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: An array of MealTypes
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/mealTypes'
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  mealTypes:
 *   type: array
 *   items:
 *    $ref: '#/definitions/mealType'
 *  mealType:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    name:
 *     type: string
 *    created_at:
 *     type: string
 *    updated_at:
 *     type: string
 */
router.get('/', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    jwtVerify(token);

    const mealTypes = await MealType.query().select('id', 'name', 'created_at', 'updated_at').where('deleted_at', null);
    res.json({ mealTypes });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /mealType/{id}:
 *   get:
 *    summary: Gets a mealType by id
 *    tags: [MealType]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: MealType ID
 *    responses:
 *     200:
 *      description: A mealType object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/mealType'
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  mealType:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    name:
 *     type: string
 *    created_at:
 *     type: string
 *    updated_at:
 *     type: string
 */
router.get('/:id', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    jwtVerify(token);

    const mealType = await MealType.query()
      .select('id', 'name', 'created_at', 'updated_at')
      .where('id', req.params.id)
      .where('deleted_at', null)
      .first();

    res.json({ mealType });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /mealType/{id}:
 *   delete:
 *    summary: Deletes a mealType by id
 *    tags: [MealType]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: MealType ID
 *    responses:
 *     200:
 *      description: A mealType object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/mealType'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  mealType:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    name:
 *     type: string
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

    const mealType = await MealType.query()
      .where('id', req.params.id)
      .update({ updated_at: 'now()', deleted_at: 'now()' })
      .returning(['id', 'name', 'created_at', 'updated_at', 'deleted_at'])
      .first();

    res.json({ mealType });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
