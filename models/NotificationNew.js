var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const NotificationNew = new Schema({
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
  view: {
    type: Boolean,
    required: true,
  },
  _from: {
    type: String,
    required: true
  },
  _to: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false,
    default: ''
  },
  link: {
    type: String,
    required: false,
    default: ''
  }
});

module.exports = mongoose.model("NotificationNew", NotificationNew);
