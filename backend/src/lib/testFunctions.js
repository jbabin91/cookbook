var superagent = require('superagent');
var agent = superagent.agent();

var theAccount = {
  email: 'jbabin91@gmail.com',
  password: 'Test123!',
};

exports.login = function (request, done) {
  request
    .post('/api/v1/signin')
    .send(theAccount)
    .end(function (err, res) {
      if (err) {
        throw err;
      }
      done(agent);
    });
};
