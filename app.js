const express = require("express");
const logger = require("morgan");

require("dotenv").config();

const gameRouter = require("./routes/game");
const scoreRouter = require("./routes/score");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/game", gameRouter);
app.use("/scores", scoreRouter);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
