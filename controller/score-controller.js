const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Score = require("../models/score");
const Game = require("../models/game");
const { DateTime } = require("luxon");
require("dotenv").config();

exports.score_get = asyncHandler(async (req, res, next) => {
  try {
    const game = await Game.findOne({ name: req.params.game_name }).exec();
    if (!game) {
      return res.send(400).json({ message: "Can't find the game" });
    }

    const allScore = await Score.find({ game: game._id }).exec();
    res.json(allScore);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

exports.score_post = [
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("score", "Score must not be empty").trim().notEmpty().escape(),
  body("game_name", "Game name must not be empty").trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const game = await Game.findOne({ name: req.body.game_name }).exec();

      if (!game) {
        return res.status(400).json({ message: "Can't find the game" });
      }

      const score = new Score({
        username: req.body.username,
        score: req.body.score,
        date: Date.now(),
        game: game._id,
      });

      await score.save();
      res.status(201).json(score);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }),
];
