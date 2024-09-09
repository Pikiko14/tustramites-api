var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Banner = new Schema({
    name: {
        type: String,
        required: true,
    },
    url_image: {
        type: String,
        default: '',
        required: false,
    },
    state: {
        type: Boolean,
        default: true,
        required: true,
    },
});

module.exports = mongoose.model("Banner", Banner);