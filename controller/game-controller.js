const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.game_start = asyncHandler(async (req, res, next) => {
  const token = jwt.sign({ date: Date.now() }, process.env.TOKEN_SECRET);
  res.json({ token });
});

exports.game_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Target data GET");
});

exports.game_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Target data POST");
});
