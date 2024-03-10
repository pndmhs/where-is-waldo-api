const express = require("express");
const game_controller = require("../controller/game-controller");

const router = express.Router();

router.get("/:name", game_controller.game_start);

router.post("/", game_controller.game_post);

router.post("/:name/targets", game_controller.check_coordinate);

module.exports = router;
