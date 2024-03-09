const asyncHandler = require("express-async-handler");

exports.score_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Score data GET");
});

exports.score_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Score data POST");
});
