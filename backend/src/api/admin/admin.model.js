const { Model } = require('objection');
const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const schema = require('./admin.schema.json');

Model.knex(db);

class Admin extends Model {
  static get tableName() {
    return tableNames.admin;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Admin;
