const express = require('express');
const yup = require('yup');
// TODO: extract to general hashing util
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const jwt = require('../../lib/jwt');
const User = require('../user/user.model');
const { errorTypes, errorMessages } = require('../../../src/middleware/errors');

const router = express.Router();

const schema = yup.object().shape({
  email: yup.string().trim().email().required(),
  firstName: yup.string().trim().min(2).required(),
  lastName: yup.string().trim().min(2).required(),
  phoneNumber: yup.string().trim().min(2).required(),
  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[a-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
});

/**
 * @swagger
 * paths:
 *  /auth/signup:         # path of the user from your endpoint
 *    post:              # endpoint request type (put request)
 *      summary: Signs up a new user
 *      tags: [Auth]
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
router.post('/signup', async (req, res, next) => {
  const { email, firstName, lastName, phoneNumber, password } = req.body;

  try {
    const createUser = {
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
    };

    await schema.validate(createUser, { abortEarly: false });

    const existingUser = await User.query().where({ email }).first();

    if (existingUser) {
      const error = new Error(errorMessages.EmailInUse);
      res.status(errorTypes.ForbiddenError);
      throw error;
    }

    // TODO: get rounds from config
    const hashedPassword = await bcrypt.hash(password, 12);
    const uuid = await uuidv4();
    const insertedUser = await User.query().insert({
      GUID: uuid,
      email,
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
    });

    delete insertedUser.password;

    const payload = {
      id: insertedUser.id,
      GUID: insertedUser.GUID,
      email,
      firstName,
      lastName,
      phoneNumber,
    };

    const token = await jwt.sign(payload);

    res.json({
      user: payload,
      token,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * path:
 *  /auth/signin:
 *    post:
 *      summary: Create a new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/signin'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/signinResponse'
 * definitions:
 *   signin:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   signinResponse:
 *     type: object
 *     properties:
 *       user:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *           GUID:
 *             type: string
 *           email:
 *             type: string
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           phoneNumber:
 *             type: string
 *       token:
 *         type: string
 */
router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.query().where({ email }).first();

    if (!user) {
      const error = new Error(errorMessages.InvalidLogin);
      res.status(errorTypes.ForbiddenError);
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      const error = new Error(errorMessages.InvalidLogin);
      res.status(errorTypes.ForbiddenError);
      throw error;
    }

    const payload = {
      id: user.id,
      GUID: user.GUID,
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    };

    const token = await jwt.sign(payload);

    res.json({ user: payload, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
