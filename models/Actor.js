var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Actor = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Actor", Actor);