const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Knex = require('knex');
const { v4: uuidv4 } = require('uuid');

const tableNames = require('../../src/constants/tableNames');
const difficulty = require('../../src/constants/difficulty');
const ingredients = require('../../src/constants/ingredients');
const measurements = require('../../src/constants/measurements');
const mealTypes = require('../../src/constants/mealTypes');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    GUID: uuidv4(),
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'test',
    phoneNumber: '2225460943',
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user)
    .del()
    .then(() => knex(tableNames.user).insert(user).returning('*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('User created:', { password }, createdUser);
  }

  const insertedMeasurements = await knex(tableNames.measurement)
    .del()
    .then(() => knex(tableNames.measurement).insert(measurements, '*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Measurements: ', insertedMeasurements);
  }

  const insertedMealTypes = await knex(tableNames.meal_type)
    .del()
    .then(() => knex(tableNames.meal_type).insert(mealTypes, '*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Meal Types: ', insertedMealTypes);
  }

  const insertedDifficulty = await knex(tableNames.difficulty)
    .del()
    .then(() => knex(tableNames.difficulty).insert(difficulty, '*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Difficulty: ', insertedDifficulty);
  }

  const insertedIngredients = await knex(tableNames.ingredient)
    .del()
    .then(() => knex(tableNames.ingredient).insert(ingredients, '*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Difficulty: ', insertedIngredients);
  }
};
