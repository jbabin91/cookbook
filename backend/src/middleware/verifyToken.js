const { errorTypes, errorMessages } = require('./errors');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    const error = new Error(errorMessages.ForbiddenError);
    res.status(errorTypes.ForbiddenError);
    throw error;
  }
}

module.exports = verifyToken;
