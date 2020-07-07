const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');

const createRecipe = async () => {
  const recipePreparation = `Cook garlic and ¼ cup oil in a medium pot over medium heat, stirring often, until garlic is beginning to turn golden, about 3 minutes. Stir in sesame seeds and cook, stirring occasionally, until garlic is golden brown and crisp, about 1 minute. Transfer mixture to a small bowl and stir in gochugaru; season with salt. Set garlic oil aside. Wipe out pot and set aside.
\n\nTrim dark green parts from scallions and thinly slice; set aside for serving. Coarsely chop white and pale green parts. Heat remaining 2 Tbsp oil in reserved pot over medium-high. Cook chopped scallions and ginger, stirring often, until scallions are charred in spots, about 4 minutes. Add tomato paste and cook, stirring occasionally, until it begins to stick to the bottom of pot and darkens slightly, about 2 minutes. Add mushrooms and kombu, then stir in 5 cups cold water. Bring to a boil, then remove from heat and let sit until mushrooms soften, about 10 minutes. Remove and discard kombu.
\n\nUsing a slotted spoon, transfer solids to a blender. Add a ladleful or 2 of broth to blender and purée until smooth. Stir purée back into broth in pot and bring to a simmer over medium heat. Add butter a piece at a time, whisking to combine after each addition before adding more. Stir in soy sauce; season with salt. Reduce heat to low and keep warm until ready to serve.
\n\nMeanwhile, bring a large pot of water to a boil. Add bok choy and cook until bright green and tender, about 2 minutes. Using a slotted spoon, transfer bok choy to a plate. Return water to a boil and cook noodles according to package directions. Drain and divide among bowls.
\n\nTo serve, ladle broth over noodles, then top with bok choy and reserved garlic oil. Top with eggs, nori, and cilantro if desired.`;

  const recipe = {
    title: "I-Can't-Believe-It's-Vegetarian-Ramen",
    prepTime: 5 * 60000,
    cookTime: 15 * 60000,
    rating: 4.5,
    servingSize: 2,
    recipePreparation: recipePreparation,
    MealType_id: 5,
    Difficulty_id: 3,
    User_id: 1,
  };
  return recipe;
};

const recipeIngredients = [
  { amount: 4, Recipe_id: 1, Ingredient_id: 8, Measurement_id: null },
  { amount: 0.75, Recipe_id: 1, Ingredient_id: 909, Measurement_id: 6 },
  { amount: 1, Recipe_id: 1, Ingredient_id: 999, Measurement_id: 8 },
  { amount: null, Recipe_id: 1, Ingredient_id: 1005, Measurement_id: null },
  { amount: 4, Recipe_id: 1, Ingredient_id: 996, Measurement_id: null },
  { amount: 1, Recipe_id: 1, Ingredient_id: 206, Measurement_id: null },
  { amount: 2, Recipe_id: 1, Ingredient_id: 1000, Measurement_id: 8 },
  { amount: 8, Recipe_id: 1, Ingredient_id: 1004, Measurement_id: null },
  { amount: 1, Recipe_id: 1, Ingredient_id: 1002, Measurement_id: null },
  { amount: 3, Recipe_id: 1, Ingredient_id: 1001, Measurement_id: 8 },
  { amount: 1, Recipe_id: 1, Ingredient_id: 694, Measurement_id: 8 },
  { amount: 4, Recipe_id: 1, Ingredient_id: 995, Measurement_id: null },
  { amount: 20, Recipe_id: 1, Ingredient_id: 993, Measurement_id: 2 },
  { amount: 1, Recipe_id: 1, Ingredient_id: 1003, Measurement_id: null },
];

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const recipe = await createRecipe();

  const [createdRecipe] = await knex(tableNames.recipe)
    .del()
    .then(() => knex(tableNames.recipe).insert(recipe).returning('*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Recipe created:', createdRecipe);
  }

  const [createRecipeIngredient] = await knex(tableNames.recipe_ingredient)
    .del()
    .then(() => knex(tableNames.recipe_ingredient).insert(recipeIngredients).returning('*'));

  if (process.env.NODE_ENV !== 'test') {
    console.log('Recipe Ingredient created:', createRecipeIngredient);
  }
};
