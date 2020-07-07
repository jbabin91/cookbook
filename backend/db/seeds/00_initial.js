const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Knex = require('knex');
const { v4: uuidv4 } = require('uuid');

const tableNames = require('../../src/constants/tableNames');
const measurements = require('../../src/constants/measurements');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  knex(tableNames.user).del();

  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    GUID: uuidv4(),
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'test',
    phoneNumber: '2225460943',
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

  if (process.env.NODE_ENV !== 'test') {
    console.log('User created:', { password }, createdUser);
  }

  // const insertedMeasurements = await knex(tableNames.measurement).insert(measurements, '*');
};
