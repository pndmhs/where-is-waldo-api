const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: { type: String, require: true, minLength: 3 },
  targets: [
    {
      character: { type: String, require: true, minLength: 3 },
      min_x: { type: Number, require: true },
      max_x: { type: Number, require: true },
      min_y: { type: Number, require: true },
      max_y: { type: Number, require: true },
    },
  ],
});

module.exports = mongoose.model("Game", GameSchema);
