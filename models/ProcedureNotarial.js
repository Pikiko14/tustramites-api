var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ProcedureNotarial = new Schema({
    notarialAct: {
        type: Schema.ObjectId,
        ref: 'NotarialActs',
    },
    actors: {
        type: Object,
        required: false,
    },
    documents: [{
        type: String,
        required: false,
    }],
    notary: {
        type: Schema.ObjectId,
        ref: 'Notary',
    },
    date: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    group_id: {
        type: String,
        required: false,
    },
    observation_document: {
        type: String,
        required: false,
    },
    payment_data: {
        type: Object,
        required: false,
    },
    paid_out: {
        type: Boolean,
        required: false,
    },
    payment_proof: {
        type: Object,
        required: false,
    },
    observation_document_result: {
        type: String,
        required: false,
    },
    date_appointment: {
        type: String,
        required: false,
    },
    order_summary_procedure: {
        type: Object,
        required: false,
    },
    order_summary_notary: {
        type: Object,
        required: false,
    },
    document_result: {
        type: Object,
        required: false,
    },
    scheduled: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model("ProcedureNotarial", ProcedureNotarial);