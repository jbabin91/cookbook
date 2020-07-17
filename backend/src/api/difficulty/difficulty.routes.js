const express = require('express');

const Difficulty = require('./difficulty.model');
const jwtVerify = require('../../../src/lib/authFunctions');
const verifyToken = require('../../../src/middleware/verifyToken');

const router = express.Router();

//TODO: Create
//TODO: Update

/**
 * @swagger
 * paths:
 *  /difficulty:
 *   get:
 *    summary: Gets all difficulty levels
 *    tags: [Difficulty]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: An array of difficulty objects
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/difficulties'
 *     403:
 *       description: You don't have permission to access this url.
 * definitions:
 *  difficulties:
 *   type: array
 *   items:
 *    $ref: '#/definitions/difficulty'
 *  difficulty:
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

    const difficulties = await Difficulty.query().select('id', 'name', 'created_at', 'updated_at').where('deleted_at', null);
    res.json({ difficulties });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /difficulty/{id}:
 *   get:
 *    summary: Gets a difficulty level by ID
 *    tags: [Difficulty]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Difficulty ID
 *    responses:
 *     200:
 *      description: A difficulty object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/difficulty'
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  difficulty:
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

    const difficulty = await Difficulty.query()
      .select('id', 'name', 'created_at', 'updated_at')
      .where('id', req.params.id)
      .where('deleted_at', null)
      .first();
    res.json({ difficulty });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /difficulty/{id}:
 *   delete:
 *    summary: Deletes a difficulty by id
 *    tags: [Difficulty]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Difficulty ID
 *    responses:
 *     200:
 *      description: A difficulty object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/difficulty'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  difficulty:
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

    const difficulty = await Difficulty.query()
      .where('id', req.params.id)
      .update({ updated_at: 'now()', deleted_at: 'now()' })
      .returning(['id', 'name', 'created_at', 'updated_at', 'deleted_at'])
      .first();

    res.json({ difficulty });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
