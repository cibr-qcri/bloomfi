module.exports.sleep = (durationMs) => {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
};
