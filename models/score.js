const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  name: { type: String, require: true, minLength: 3 },
  start_time: { type: Date, require: true },
  end_time: { type: Date },
  game: { type: Schema.ObjectId, ref: "Game" },
});

module.exports = mongoose.model("Score", ScoreSchema);
