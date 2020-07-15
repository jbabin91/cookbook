const express = require('express');

const Measurement = require('./measurement.model');
const jwt = require('../../lib/jwt');
const verifyToken = require('../../../src/middleware/verifyToken');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /measurement:         # path of the user from your endpoint
 *    post:              # endpoint request type (put request)
 *      summary: Signs up a new user
 *      tags: [Measurement]
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

    const measurements = await Measurement.query()
      .select('id', 'type', 'unit', 'abbreviation', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json(measurements);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
