var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Category", Category);
