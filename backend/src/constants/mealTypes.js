const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(path.join(__dirname, '..', '..', 'db', 'sources', 'meal_types.csv'), 'utf8');

const mealTypes = Papa.parse(csvData, {
  header: true,
});

module.exports = mealTypes.data.map(({ name }) => ({
  name,
}));
