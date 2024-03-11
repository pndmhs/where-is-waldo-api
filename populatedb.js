const Game = require("./models/game");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGames();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function gameCreate(gameObject) {
  const game = new Game(gameObject);

  await game.save();
  console.log(`Added game: ${gameObject.name}`);
}

async function createGames() {
  console.log("Adding games");
  await Promise.all([
    gameCreate({
      name: "beach",
      targets: [
        {
          character: "Waldo",
          min_x: 785.5,
          max_x: 801.5,
          min_y: 302,
          max_y: 326,
        },
        {
          character: "Wizard",
          min_x: 339.5,
          max_x: 353.5,
          min_y: 284,
          max_y: 310,
        },
        {
          character: "Odlaw",
          min_x: 134.5,
          max_x: 141.5,
          min_y: 286,
          max_y: 310,
        },
        {
          character: "Wanda",
          min_x: 984.5,
          max_x: 993.5,
          min_y: 330,
          max_y: 345,
        },
      ],
    }),

    gameCreate({
      name: "ski-slopes",
      targets: [
        {
          character: "Waldo",
          min_x: 1080.5,
          max_x: 1107.5,
          min_y: 1090.5,
          max_y: 1097.5,
        },
        {
          character: "Wanda",
          min_x: 621.5,
          max_x: 630.5,
          min_y: 330,
          max_y: 354,
        },
      ],
    }),

    gameCreate({
      name: "track-and-field",
      targets: [
        {
          character: "Waldo",
          min_x: 348.5,
          max_x: 373.5,
          min_y: 262,
          max_y: 290,
        },
        {
          character: "Wanda",
          min_x: 316.5,
          max_x: 327.5,
          min_y: 578,
          max_y: 603,
        },
        {
          character: "Wizard",
          min_x: 776.5,
          max_x: 791.5,
          min_y: 685,
          max_y: 713,
        },
        {
          character: "Odlaw",
          min_x: 759.5,
          max_x: 773.5,
          min_y: 511,
          max_y: 538,
        },
      ],
    }),
  ]);
}
