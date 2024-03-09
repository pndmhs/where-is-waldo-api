const asyncHandler = require("express-async-handler");

exports.target_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Target data GET");
});

exports.target_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Target data POST");
});
