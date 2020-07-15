const { Model } = require('objection');
const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const schema = require('./user.schema.json');

Model.knex(db);

class User extends Model {
  static get tableName() {
    return tableNames.user;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = User;
