const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
  isMultiSelect: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "teacher",
  },
});

const quiz = mongoose.model("quiz", quizSchema);

module.exports = quiz;
