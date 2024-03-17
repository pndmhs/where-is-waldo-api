const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const gameRouter = require("./routes/game");
const scoreRouter = require("./routes/score");

const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    name: `Where's Waldo API`,
    endpoints: ["/game", "/scores"],
  });
});

app.use("/game", gameRouter);
app.use("/scores", scoreRouter);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
