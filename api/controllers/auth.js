const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const { activationEmailTemplate, sendEmail } = require('../utils/mail');
const sendTokenResponse = require('../utils/sendTokenResponse');

// @desc      Logs in a user
// @route     POST /api/v1/auth/login
// @access    Public
const login = asyncHandler(async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide login credentials', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const match = await user.matchPassword(password);
  if (!match) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  if (!user.isActivated) {
    return next(new ErrorResponse('Account is not activated', 400));
  }

  sendTokenResponse(user, 200, response);
});

// @desc      Logs out a user and clears the cookie
// @route     GET /api/v1/auth/logout
// @access    Public
const logout = asyncHandler(async (request, response) => {
  response.cookie('token', 'none', {
    expires: new Date(Date.now() + parseInt(process.env.LOGOUT_COOKIE_EXPIRE_MS, 10)),
    httpOnly: true,
  });

  response.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Registers a new user
// @route     POST /api/v1/auth/register
// @access    Public
const register = asyncHandler(async (request, response, next) => {
  const { firstName, lastName, organization, email, password } = request.body;

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorResponse('User account already exists', 400));
  } else {
    user = await User.create({
      firstName,
      lastName,
      organization,
      email,
      password,
    });
  }

  const emailTemplate = activationEmailTemplate({
    to: user.email,
    firstName: user.firstName,
    url: process.env.ACCOUNT_ACTIVIATION_URL,
    token: user.generateActivationToken(process.env.JWT_ACTIVATION_EXPIRE_DAYS),
  });

  try {
    await sendEmail(emailTemplate);
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Could not send activation email', 500));
  }

  response.status(200).json({
    success: true,
    data: {},
  });
});

// @desc Acivate a user account
// @route GET /api/v1/auth/activate/:token
// @access Public
const activate = asyncHandler(async (request, response, next) => {
  let decodedToken = null;

  try {
    decodedToken = jwt.verify(request.params.token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new ErrorResponse('Invalid activation token', 400));
  }

  await User.findByIdAndUpdate(decodedToken.id, {
    isActivated: true,
  });

  response.status(200).json({
    success: true,
    data: {},
  });
});

exports.login = login;
exports.logout = logout;
exports.register = register;
exports.activate = activate;
