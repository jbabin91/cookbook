const errorTypes = {
  ForbiddenError: 403,
  UnAuthorizedError: 401,
  UniqueViolationError: 409,
  ValidationError: 422,
};

const errorMessages = {
  BadToken: 'Failed to authenticate token',
  EmailInUse: 'Email in use.',
  ForbiddenError: "You don't have permission to access this url.",
  InvalidLogin: 'Invalid login.',
  NoToken: 'No Token',
  UniqueViolationError: 'Already exists.',
};

function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: errorMessages[error.name] || error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    errors: error.errors || undefined,
  });
}

module.exports = {
  notFound,
  errorHandler,
  errorTypes,
  errorMessages,
};
