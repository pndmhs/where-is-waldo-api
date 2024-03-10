const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Score = require("../models/score");
require("dotenv").config();

exports.score_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Score data GET");
});

exports.score_post = [
  body("name", "Name must not be empty").trim().isLength({ min: 3 }).escape(),
  body("token", "Token must not be empty").trim().notEmpty().escape(),
  body("game_id", "game_id must not be empty").trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.sendStatus(400);
      }

      const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
      const start_time = decoded.start_time;

      const score = new Score({
        name: req.body.name,
        start_time,
        end_time: req.body.end_time || Date.now(),
        game: req.body.game_id,
      });

      await score.save();
      res.status(201).json(score);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }),
];
