var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Chatbot = new Schema({
  key: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  secondLevel: {
    type: Object,
    required: false,
  },
  whatsapp: {
    type: Boolean,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model("chatbots", Chatbot);
