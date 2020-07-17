const express = require('express');

const Measurement = require('./measurement.model');
const jwtVerify = require('../../../src/lib/authFunctions');
const verifyToken = require('../../../src/middleware/verifyToken');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /measurement:
 *   post:
 *    summary: Creates a new measurement
 *    tags: [Measurement]
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/measurementBody'
 *    responses:
 *     200:
 *      description: A measurement object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/measurementResponse'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  measurementBody:
 *   type: object
 *   properties:
 *    type:
 *     type: string
 *    unit:
 *     type: string
 *    abbreviation:
 *     type: string
 *  measurementResponse:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    type:
 *     type: string
 *    unit:
 *     type: string
 *    abbreviation:
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

    const { type, unit, abbreviation } = req.body;

    const measurement = await Measurement.query().insert({ type, unit, abbreviation });

    res.json({ measurement });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /measurement:
 *   get:
 *    summary: Gets all measurements
 *    tags: [Measurement]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: An array of measurement objects
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/measurements'
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  measurements:
 *   type: array
 *   items:
 *    $ref: '#/definitions/measurement'
 *  measurement:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    type:
 *     type: string
 *    unit:
 *     type: string
 *    abbreviation:
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

    const measurements = await Measurement.query()
      .select('id', 'type', 'unit', 'abbreviation', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json({ measurements });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /measurement/{id}:
 *   get:
 *    summary: Get a measurement by ID
 *    tags: [Measurement]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: A measurement object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/measurement'
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  measurement:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    type:
 *     type: string
 *    unit:
 *     type: string
 *    abbreviation:
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

    const measurement = await Measurement.query()
      .select('id', 'type', 'unit', 'abbreviation', 'created_at', 'updated_at')
      .where('id', req.params.id)
      .where('deleted_at', null)
      .first();

    res.json({ measurement });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /measurement/{id}:
 *   put:
 *    summary: Updates a measurement by id
 *    tags: [Measurement]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Measurement ID
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/measurementBody'
 *    responses:
 *     200:
 *      description: A measurement object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/measurementResponse'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  measurementBody:
 *   type: object
 *   properties:
 *    type:
 *     type: string
 *    unit:
 *     type: string
 *    abbreviation:
 *     type: string
 *  measurementResponse:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    type:
 *     type: string
 *    unit:
 *     type: string
 *    abbreviation:
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

    const { type, unit, abbreviation } = req.body;

    const measurement = await Measurement.query()
      .where('id', req.params.id)
      .update({ type, unit, abbreviation, updated_at: 'now()' })
      .returning(['id', 'name', 'created_at', 'updated_at'])
      .first();

    res.json({ measurement });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /measurement/{id}:
 *   delete:
 *    summary: Deletes a measurement by id
 *    tags: [Measurement]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: A measurement object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/measurement'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  measurement:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    type:
 *     type: string
 *    unit:
 *     type: string
 *    abbreviation:
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

    const measurement = await Measurement.query()
      .where('id', req.params.id)
      .update({ updated_at: 'now()', deleted_at: 'now()' })
      .returning(['id', 'type', 'unit', 'abbreviation', 'created_at', 'updated_at', 'deleted_at'])
      .first();

    res.json({ measurement });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
