const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Game = require("../models/game");
require("dotenv").config();

exports.game_start = asyncHandler(async (req, res, next) => {
  const token = jwt.sign({ date: Date.now() }, process.env.TOKEN_SECRET);
  res.json({ token });
});

exports.game_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Target data GET");
});

exports.game_post = [
  body("name", "Name must not be empty").trim().isLength({ min: 3 }).escape(),
  body("targets.*.character").trim().isLength({ min: 3 }).escape(),
  body("targets.*.min_x").isNumeric(),
  body("targets.*.max_x").isNumeric(),
  body("targets.*.min_y").isNumeric(),
  body("targets.*.max_y").isNumeric(),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const game = new Game({
        name: req.body.name,
        targets: req.body.targets,
      });

      await game.save();
      res.status(201).json(game);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }),
];
