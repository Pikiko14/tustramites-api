var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const User = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    required: false
  },
  role: {
    type: String,
    default: "CL",
    enum: ["ADMINISTRADOR", "CLIENTE", "ABOGADO", "DIRECTOR", "GERENTE", "ASESOR LEGAL", "SECRETARIA","CALL CENTER"],
  },
  url_image: {
    type: String,
    required: false,
  },
  enterprise: {
    type: Boolean,
    required: false,
  },
  notification_token: {
    type: String,
    required: false,
  },
  phone:{
    type: String,
    required:false
  },
  name_enterprise:{
    type: String,
    required:false
  }
});


module.exports = mongoose.model("User", User);
