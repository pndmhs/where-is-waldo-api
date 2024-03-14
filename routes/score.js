const express = require("express");
const score_controller = require("../controller/score-controller");

const router = express.Router();

router.get("/:game_name", score_controller.score_get);

router.post("/", score_controller.score_post);

module.exports = router;
