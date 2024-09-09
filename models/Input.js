var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Input = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    enum: ["text", "string", "number", "date", "list", "file","email"],
    required: true,
  },
  required: {
    type: Boolean,
    default: true,
    required: true,
  },
  maxCant: {
    type: Number,
    required: true,
  },
  minCant: {
    type: Number,
    required: true,
  },
  validation: {
    type: Boolean,
    required: true,
  },
  actor: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Input", Input);
