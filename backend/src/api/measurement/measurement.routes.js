const express = require('express');

const Admin = require('../admin/admin.model');
const Measurement = require('./measurement.model');
const jwt = require('../../lib/jwt');
const verifyToken = require('../../../src/middleware/verifyToken');
const { errorTypes, errorMessages } = require('../../../src/middleware/errors');

const router = express.Router();

//TODO: Create
//TODO: Update

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
    const jwtResponse = await jwt.verify(token);

    if (jwtResponse.error) {
      throw jwtResponse.error;
    }

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
    const jwtResponse = await jwt.verify(token);

    if (jwtResponse.error) {
      throw jwtResponse.error;
    }

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
