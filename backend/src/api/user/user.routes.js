const express = require('express');

const Admin = require('../admin/admin.model');
const User = require('./user.model');
const jwt = require('../../lib/jwt');
const verifyToken = require('../../middleware/verifyToken');
const { errorTypes, errorMessages } = require('../../../src/middleware/errors');

const router = express.Router();

//TODO: Update

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
 * definitions:
 *  users:
 *   type: array
 *   items:
 *    $ref: '#/definitions/user'
 *  user:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    GUID:
 *     type: string
 *    email:
 *     type: string
 *    firstName:
 *     type: string
 *    lastName:
 *     type: string
 *    phoneNumber:
 *     type: string
 *    last_login:
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

    const users = await User.query()
      .select('id', 'GUID', 'email', 'firstName', 'lastName', 'phoneNumber', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json({ users });
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
 *      description: A user object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/user'
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  user:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    GUID:
 *     type: string
 *    email:
 *     type: string
 *    firstName:
 *     type: string
 *    lastName:
 *     type: string
 *    phoneNumber:
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

    const user = await User.query()
      .select('id', 'GUID', 'email', 'firstName', 'lastName', 'phoneNumber', 'created_at', 'updated_at')
      .where('id', req.params.id)
      .where('deleted_at', null)
      .first();
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /user/{id}:
 *   delete:
 *    summary: Deletes a user by id
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
 *      description: A user object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/user'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  user:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    GUID:
 *     type: string
 *    email:
 *     type: string
 *    firstName:
 *     type: string
 *    lastName:
 *     type: string
 *    phoneNumber:
 *     type: string
 *    last_login:
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

    const user = await User.query()
      .where('id', req.params.id)
      .update({ updated_at: 'now()', deleted_at: 'now()' })
      .returning(['id', 'GUID', 'email', 'firstName', 'lastName', 'phoneNumber', 'last_login', 'created_at', 'updated_at', 'deleted_at'])
      .first();

    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
