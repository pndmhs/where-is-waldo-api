const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Game = require("../models/game");
require("dotenv").config();

exports.game_start = asyncHandler(async (req, res, next) => {
  const game = await Game.findOne({ name: req.params.name }).exec();
  if (!game) return res.sendStatus(400);
  const token = jwt.sign({ start_time: Date.now() }, process.env.TOKEN_SECRET);
  return res.json({ game_id: game._id, token });
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

exports.check_coordinate = [
  body("targets.*.character", "Character name must not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("targets.*.min_x", "Coordinate must be a number").trim().isNumeric(),
  body("targets.*.min_y", "Coordinate must be a number").trim().isNumeric(),
  body("targets.*.max_x", "Coordinate must be a number").trim().isNumeric(),
  body("targets.*.max_y", "Coordinate must be a number").trim().isNumeric(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.sendStatus(400);
    }

    const game = await Game.findOne({ name: req.params.name }).exec();
    const selectedTarget = req.body.targets;

    const correctTargets = game.targets.filter((target1) => {
      return selectedTarget.some((target2) => {
        const condition1 =
          target2.x >= target1.min_x && target2.x <= target1.max_x;
        const condition2 =
          target2.y >= target1.min_y && target2.y <= target1.max_y;
        const condition3 = target2.character === target1.character;
        return condition1 && condition2 && condition3;
      });
    });

    if (selectedTarget.length !== correctTargets.length) {
      return res.sendStatus(400);
    }

    if (correctTargets.length === game.targets.length) {
      return res.json({ finished: true });
    }

    return res.json({ finished: false });
  }),
];
