// eslint-disable-next-line no-unused-vars
const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');

const { addDefaultColumns, createNameTable, email, references } = require('../../src/lib/tableUtils.js');

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.user, (table) => {
      table.increments().notNullable();
      table.uuid('GUID').notNullable();
      email(table, 'email').notNullable();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('phoneNumber').notNullable();
      table.string('password', 127).notNullable();
      table.datetime('last_login');
      addDefaultColumns(table);
      table.unique(['GUID', 'email']);
    }),
    knex.schema.createTable(tableNames.measurement, (table) => {
      table.increments().notNullable();
      table.string('type').notNullable();
      table.string('unit').notNullable();
      table.string('abbreviation').notNullable();
      addDefaultColumns(table);
    }),
    createNameTable(knex, tableNames.meal_type),
    createNameTable(knex, tableNames.difficulty),
    createNameTable(knex, tableNames.ingredient),
  ]);

  await knex.schema.createTable(tableNames.recipe, (table) => {
    table.increments().notNullable();
    table.string('title').notNullable();
    table.double('prepTime').notNullable();
    table.double('cookTime').notNullable();
    table.double('rating').notNullable();
    table.double('servingSize').notNullable();
    table.text('recipePreparation').notNullable();
    references(table, 'MealType', false);
    references(table, 'Difficulty', false);
    references(table, 'User', false);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.recipe_ingredient, (table) => {
    table.increments().notNullable();
    table.double('amount');
    references(table, 'Recipe', false);
    references(table, 'Ingredient', false);
    references(table, 'Measurement', false);
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.recipe_ingredient,
      tableNames.recipe,
      tableNames.user,
      tableNames.meal_type,
      tableNames.difficulty,
      tableNames.ingredient,
      tableNames.measurement,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName)),
  );
};
