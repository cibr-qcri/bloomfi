const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = asyncHandler(async (request, response, next) => {
  let token = null;
  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
    token = request.headers.authorization.split(' ')[1];
  } else if (request.cookies.token) {
    token = request.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedToken.id);
    if (!user) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    request.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

const authorize = (model) => async (request, response, next) => {
  const query = await model.findById(request.params.id).select('+user');

  if (!query) {
    const name = model.modelName.toLowerCase();
    return next(new ErrorResponse(`No ${name} found with id ${request.params.id}`, 404));
  }

  if (query.user.toString() !== request.user.id) {
    return next(new ErrorResponse(`Not permitted to access this resource`, 403));
  }
  next();
};

exports.protect = protect;
exports.authorize = authorize;
