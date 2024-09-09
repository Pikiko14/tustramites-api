var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Comment = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    position_company: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    url_image: {
        type: String,
        default: '',
        required: true,
    },
    state: {
        type: Boolean,
        default: true,
        required: true,
    },
});

module.exports = mongoose.model("Commetn", Comment);