var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AditionalConfigs = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("aditionalconfigs", AditionalConfigs);