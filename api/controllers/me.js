const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Get a logged in user
// @route     GET /api/v1/me
// @access    Private
const getMe = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);

  response.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update a logged in user
// @route     PUT /api/v1/me
// @access    Private
const updateMe = asyncHandler(async (request, response) => {
  const user = await User.findByIdAndUpdate(request.user.id, request.body, {
    new: true,
    runValidators: true,
  });

  response.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete a logged in user
// @route     DELETE /api/v1/me
// @access    Private
const deleteMe = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);
  await user.remove();

  response.status(200).json({
    success: true,
    data: {},
  });
});

exports.getMe = getMe;
exports.updateMe = updateMe;
exports.deleteMe = deleteMe;
