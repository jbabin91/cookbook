const express = require('express');

const User = require('./user.model');
const jwt = require('../../lib/jwt');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /user:
 *   get:
 *    summary: Gets all users
 *    tags: [User]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: An array of user objects
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/users'
 *     403:
 *      description: You don't have permission to access this url.
 *
 * definitions:
 *   users:
 *    type: array
 *    items:
 *     $ref: '#/definitions/user'
 *   user:
 *     type: object
 *     properties:
 *      id:
 *       type: integer
 *      GUID:
 *       type: string
 *      email:
 *       type: string
 *      firstName:
 *       type: string
 *      lastName:
 *       type: string
 *      phoneNumber:
 *       type: string
 *      created_at:
 *       type: string
 *      updated_at:
 *       type: string
 */
router.get('/', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    const error = await jwt.verify(token);

    if (error) {
      throw error;
    }

    const users = await User.query()
      .select('id', 'GUID', 'email', 'firstName', 'lastName', 'phoneNumber', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /user/{id}:
 *   get:
 *    summary: Get a user by id
 *    tags: [User]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: ID of user
 *    responses:
 *     200:
 *      description: A user objects
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/user'
 *     403:
 *      description: You don't have permission to access this url.
 *
 * definitions:
 *   user:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *     GUID:
 *      type: string
 *     email:
 *      type: string
 *     firstName:
 *      type: string
 *     lastName:
 *      type: string
 *     phoneNumber:
 *      type: string
 *     created_at:
 *      type: string
 *     updated_at:
 *      type: string
 */
router.get('/:id', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    const error = await jwt.verify(token);

    if (error) {
      throw error;
    }

    const users = await User.query()
      .select('id', 'GUID', 'email', 'firstName', 'lastName', 'phoneNumber', 'created_at', 'updated_at')
      .where('id', req.params.id)
      .where('deleted_at', null);
    const [first] = users;
    res.json(first);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
