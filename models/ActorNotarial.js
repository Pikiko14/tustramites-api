var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ActorNotarial = new Schema({
    actor: {
        type: String,
        required: true,
    },
    iterative: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("ActorNotarial", ActorNotarial);