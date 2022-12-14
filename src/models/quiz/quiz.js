const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const quizSchema = Schema({
//   question: {
//     type: [String],
//     required: true,
//   },
//   options: {
//     type: [String],
//     required: true,
//   },
//   answers: {
//     type: [String],
//     required: true,
//   },
//   isMultiSelect: {
//     type: Boolean,
//     required: true,
//   },
//   maxScore: {
//     type: Number,
//     required: true,
//   },
//   timeLimit: {
//     type: Number,
//     required: true,
//   },
//   teacher: {
//     type: Schema.Types.ObjectId,
//     ref: "teacher",
//   },
// });

const quizSchema = Schema({
  quiz: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      answers: {
        type: [String],
        required: true,
      },
      isMultiSelect: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
  course: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  maxScore: {
    type: Number,
    required: true,
  },
  timeLimit: {
    type: Number,
    required: true,
  },
});

const quiz = mongoose.model("quiz", quizSchema);

module.exports = quiz;
