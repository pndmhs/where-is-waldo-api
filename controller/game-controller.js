const asyncHandler = require("express-async-handler");

exports.game_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Target data GET");
});

exports.game_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Target data POST");
});
