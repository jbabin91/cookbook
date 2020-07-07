const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const measurements = require('../../src/constants/measurements');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const insertedMeasurements = await knex(tableNames.measurement)
    .del()
    .then(() => knex(tableNames.measurement).insert(measurements, '*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Measurements: ', insertedMeasurements);
  }
};
