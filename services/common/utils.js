module.exports.sleep = (timeMs) => {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
};
