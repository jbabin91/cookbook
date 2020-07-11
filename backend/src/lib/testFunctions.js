var app = require('../app');
var request = require('supertest')(app);

function loginUser() {
  return function (done) {
    request
      .post('/api/v1/auth/signin')
      .send({
        email: 'jbabin91@gmail.com',
        password: 'Test123!',
      })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      if (err) return err;
      return res.body.token;
    }
  };
}

module.exports = loginUser;
