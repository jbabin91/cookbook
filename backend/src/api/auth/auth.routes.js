const express = require('express');
const yup = require('yup');
// TODO: extract to general hashing util
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const jwt = require('../../lib/jwt');
const User = require('../users/users.model');
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
