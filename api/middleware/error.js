const ErrorResponse = require('../utils/errorResponse');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  let errorResponse = { ...error };
  errorResponse.message = error.message;
  console.log(`${error}`.red);

  // Bad ObjectId
  if (error.name === 'CastError') {
    const message = 'Resource not found';
    errorResponse = new ErrorResponse(message, 404);
  }

  // Duplicate key
  if (error.code === 11000) {
    const message = 'Duplicate field value entered';
    errorResponse = new ErrorResponse(message, 400);
  }

  // Validation error
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((error) => error.message);
    errorResponse = new ErrorResponse(message, 400);
  }

  response.status(errorResponse.statusCode || 500).json({
    success: false,
    error: errorResponse.message || 'Server Error',
  });
};

module.exports = errorHandler;
