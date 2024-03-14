const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  username: { type: String, require: true, minLength: 3 },
  score: { type: String, require: true },
  date: { type: Date, require: true },
  game: { type: Schema.ObjectId, ref: "Game" },
});

module.exports = mongoose.model("Score", ScoreSchema);
