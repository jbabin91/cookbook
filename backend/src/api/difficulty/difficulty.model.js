const { Model } = require('objection');
const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const schema = require('./difficulty.schema.json');

Model.knex(db);

class Difficulty extends Model {
  static get tableName() {
    return tableNames.difficulty;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Difficulty;
