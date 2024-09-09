var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Contact = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: false,
        required: true,
    },
});

module.exports = mongoose.model("Contact", Contact);