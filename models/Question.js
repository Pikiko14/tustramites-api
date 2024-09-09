var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Question = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.ObjectId,
        ref: 'CategoryQuestion',
        required: true,
    },
    subcategory: {
        type: Schema.ObjectId,
        ref: 'SubCategoryQuestion',
        required: true,
    }
});

module.exports = mongoose.model("Question", Question);
