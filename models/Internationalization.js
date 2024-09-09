var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Internationalization = new Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: false,
        required: true,
    },
});

module.exports = mongoose.model("Internationalization", Internationalization);