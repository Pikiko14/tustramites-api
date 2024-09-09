var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Page = new Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Page", Page);
