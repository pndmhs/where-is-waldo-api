const express = require("express");
const game_controller = require("../controller/game-controller");

const router = express.Router();

router.get("/", game_controller.game_get);

router.post("/", game_controller.game_post);

module.exports = router;
