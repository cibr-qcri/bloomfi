const asyncHandler = (asyncFunc) => (request, response, next) =>
  Promise.resolve(asyncFunc(request, response, next)).catch(next);

module.exports = asyncHandler;
