const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const mealTypes = require('../../src/constants/mealTypes');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const insertedMealTypes = await knex(tableNames.meal_type)
    .del()
    .then(() => knex(tableNames.meal_type).insert(mealTypes, '*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Meal Types: ', insertedMealTypes);
  }
};
