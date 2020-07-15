const { Model } = require('objection');
const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const schema = require('./recipeIngredient.schema.json');

Model.knex(db);

class RecipeIngredient extends Model {
  static get tableName() {
    return tableNames.recipe_ingredient;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = RecipeIngredient;
