var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const SubCategoryQuestion = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.ObjectId,
        ref: 'CategoryQuestion',
        required: true,
    },
});

module.exports = mongoose.model("SubCategoryQuestion", SubCategoryQuestion);
