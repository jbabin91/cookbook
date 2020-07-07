const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const difficulty = require('../../src/constants/difficulty');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const insertedDifficulty = await knex(tableNames.difficulty)
    .del()
    .then(() => knex(tableNames.difficulty).insert(difficulty, '*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Difficulty: ', insertedDifficulty);
  }
};
