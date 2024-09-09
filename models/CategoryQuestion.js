var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CategoryQuestion = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("CategoryQuestion", CategoryQuestion);
