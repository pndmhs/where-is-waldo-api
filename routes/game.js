const express = require("express");
const game_controller = require("../controller/game-controller");

const router = express.Router();

router.get("/:name", game_controller.game_get);

router.get("/:name/start", game_controller.game_start);

router.post("/", game_controller.game_post);

module.exports = router;
