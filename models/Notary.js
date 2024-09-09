var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Notary = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  sector: {
    type: String,
    required: false,
    enum: ["NORTE", "CENTRO","SUR"],
  },
  schedule: {
    type: Object,
    required: false,
  },
  commissioner: {
    type: String,
    required: true,
  },
  type_bank_account : {
    type: String,
    required: true,
  },
  account_number : {
    type: Number,
    required: true,
  },
  bank : {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Notary", Notary);
