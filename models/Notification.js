var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Notification = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  view: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Notification", Notification);
