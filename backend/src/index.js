const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
