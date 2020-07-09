const { Model } = require('objection');
const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const schema = require('./mealType.schema.json');

Model.knex(db);

class MealType extends Model {
  static get tableName() {
    return tableNames.meal_type;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = MealType;
