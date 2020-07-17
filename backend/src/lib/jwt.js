const jwt = require('jsonwebtoken');

function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      },
    );
  });
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        // const error = new Error(errorMessages.ForbiddenError);
        // res.status(errorTypes.ForbiddenError);
        return reject({ payload: null, error });
      }
      // return false for no error
      return resolve({ payload: decoded, error: false });
    });
  });
}

module.exports = {
  sign,
  verify,
};
