const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(path.join(__dirname, '..', '..', 'db', 'sources', 'difficulty.csv'), 'utf8');

const difficulty = Papa.parse(csvData, {
  header: true,
});

module.exports = difficulty.data.map(({ name }) => ({
  name,
}));
