const express = require('express');

const User = require('./user.model');
const jwtVerify = require('../../lib/authFunctions');
const verifyToken = require('../../middleware/verifyToken');

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
    jwtVerify(token);

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
    jwtVerify(token);

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
 *   put:
 *    summary: Updates a user by id
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
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/userBody'
 *    responses:
 *     200:
 *      description: A user object
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/userResponse'
 *     401:
 *      description: You don't have the proper permissions.
 *     403:
 *      description: You don't have permission to access this url.
 * definitions:
 *  userBody:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *    firstName:
 *     type: string
 *    lastName:
 *     type: string
 *    phoneNumber:
 *     type: string
 *    password:
 *     type: string
 *  userResponse:
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
router.put('/:id', verifyToken, async (req, res, next) => {
  const { token } = req;

  try {
    jwtVerify(token, 'update');

    const { email, firstName, lastName, phoneNumber, password } = req.body;

    const existingEmail = await User.query().where({ email }).first();

    if (existingEmail) {
      const error = new Error(errorMessages.EmailInUse);
      res.status(errorTypes.ForbiddenError);
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const user = await User.query()
      .where('id', req.params.id)
      .update({ email, firstName, lastName, phoneNumber, password: hashedPassword, updated_at: 'now()' })
      .returning(['id', 'GUID', 'email', 'firstName', 'lastName', 'phoneNumber', 'last_login', 'created_at', 'updated_at'])
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
    jwtVerify(token, 'delete');

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
