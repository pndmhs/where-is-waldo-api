const express = require("express");
const target_controller = require("../controller/game-controller");

const router = express.Router();

router.get("/", target_controller.target_get);

router.post("/", target_controller.target_post);

module.exports = router;
