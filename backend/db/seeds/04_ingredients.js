const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const ingredients = require('../../src/constants/ingredients');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const insertedIngredients = await knex(tableNames.ingredient)
    .del()
    .then(() => knex(tableNames.ingredient).insert(ingredients, '*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Difficulty: ', insertedIngredients);
  }
};
