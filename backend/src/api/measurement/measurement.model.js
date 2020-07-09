const { Model } = require('objection');
const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const schema = require('./measurement.schema.json');

Model.knex(db);

class Measurement extends Model {
  static get tableName() {
    return tableNames.measurement;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Measurement;
