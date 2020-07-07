const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(path.join(__dirname, '..', '..', 'db', 'sources', 'measurements.csv'), 'utf8');

const measurements = Papa.parse(csvData, {
  header: true,
});

module.exports = measurements.data.map(({ type, unit, abbreviation }) => ({
  type,
  unit,
  abbreviation,
}));
