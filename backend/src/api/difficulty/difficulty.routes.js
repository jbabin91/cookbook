const express = require('express');

const Difficulty = require('./difficulty.model');
const jwtVerify = require('../../../src/lib/authFunctions');
const verifyToken = require('../../../src/middleware/verifyToken');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /difficulty:
 *   post:
 *    summary: Creates a new difficulty level
 *    tags: [Difficulty]
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/difficultyBody'
 *    responses:
 *     200:
 *      description: A difficulty level object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/difficultyResponse'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  difficultyBody:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *  difficultyResponse:
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
router.post('/', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    jwtVerify(token, 'create');

    const { name } = req.body;

    const difficulty = await Difficulty.query().insert({ name });

    res.json({ difficulty });
  } catch (err) {
    next(err);
  }
});

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
 *      description: An array of difficulty level objects
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
 *      description: A difficulty level object
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
 *   put:
 *    summary: Updates a difficulty by id
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
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/difficultyBody'
 *    responses:
 *     200:
 *      description: A difficulty level object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/difficultyResponse'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  difficultyBody:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *  difficultyResponse:
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
router.put('/:id', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    jwtVerify(token, 'update');

    const { name } = req.body;

    const difficulty = await Difficulty.query()
      .where('id', req.params.id)
      .update({ name, updated_at: 'now()' })
      .returning(['id', 'name', 'created_at', 'updated_at'])
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
 *      description: A difficulty level object
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
