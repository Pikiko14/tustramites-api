var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Callme = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: false,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
        enum: ["Cualquier horario", "Mañana", "Tarde", "Noche"],
    },
});

module.exports = mongoose.model("Callme", Callme);