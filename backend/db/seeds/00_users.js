const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Knex = require('knex');
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const tableNames = require('../../src/constants/tableNames');

const createTestUser = async () => {
  const user = {
    GUID: await uuidv4(),
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'user',
    phoneNumber: '224-453-6654',
    password: await bcrypt.hash('Test123!', 12),
  };
  return user;
};

const createFakeUser = async () => {
  const password = crypto.randomBytes(15).toString('hex');
  const user = {
    GUID: await uuidv4(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    password: await bcrypt.hash(password, 12),
  };
  return user;
};

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const user = await createTestUser();

  const [createdUser] = await knex(tableNames.user)
    .del()
    .then(() => knex(tableNames.user).insert(user).returning('*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('User created:', user.password, createdUser);
  }
};
