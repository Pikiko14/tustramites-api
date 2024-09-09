var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const NotarialActs = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Category',
  },
  actors: {
    type: Object,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  documents: {
    type: Object,
    required: true,
  },
  notary: {
    type: Boolean,
    default: false,
    required: true,
  },
  payment: {
    type: Boolean,
    default: true,
    required: true,
  },
  document_result: {
    type: String,
    default:'',
    required: false,
  },
  date: {
    type: Boolean,
    default: false,
    required: true,
  },
  time_delivery: {
    type: String,
    default: '0 meses',
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  note_2: {
    type: String,
    required: false,
  },
  page: {
    type: Schema.ObjectId,
    ref: 'Page',
    required: false,
  },
});

module.exports = mongoose.model("NotarialActs", NotarialActs);
