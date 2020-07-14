const { Model } = require('objection');
const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const schema = require('./recipe.schema.json');

Model.knex(db);

class Recipe extends Model {
  static get tableName() {
    return tableNames.recipe;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Recipe;
