const teacher = require("../models/users/teacher");
const student = require("../models/users/student");
const quiz = require("../models/quiz/quiz");

//create

const addStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const exTeacher = await teacher.findById({ _id: id });
    if (!exTeacher) {
      return res
        .status(404)
        .send({ message: "No teachers found", success: false });
    }
    const { name, email, password, role } = req.body;
    const exStudent = await student.findOne({ email: email });
    if (exStudent) {
      return res
        .status(400)
        .send({ message: "student already present", success: false });
    }
    const newStudent = new student({
      name: name,
      email: email,
      password: password,
      role: role,
      teacher: exTeacher._id,
    });
    newStudent.save();

    res.status(200).send({ message: "student created", success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const addQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const exTeacher = await teacher.findById({ _id: id });
    if (!exTeacher) {
      return res
        .status(404)
        .send({ message: "No teachers found", success: false });
    }
    const { question, options, answers, isMultiSelect, maxScore, timeLimit } =
      req.body;
    const newQuiz = new quiz({
      question: question,
      options: options,
      answers: answers,
      isMultiSelect: isMultiSelect,
      maxScore: maxScore,
      timeLimit: timeLimit,
      createdBy: exTeacher._id,
    });
    newQuiz.save();
    res.status(200).send({ message: "quiz created", success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getMyQuizes = async (req, res) => {
  const { id } = req.params;
  const exTeacher = await teacher.findById({ _id: id });
  if (!exTeacher) {
    return res
      .status(404)
      .send({ message: "No teachers found", success: false });
  }
  const myQuizes = await quiz
    .findOne({ teacher: exTeacher._id })
    .populate("teacher", "name, email");
  if (!myQuizes) {
    return res.status(404).send({ message: "No quizes found", success: false });
  }
  res.status(200).send({ success: true, quizes: myQuizes });
};

const getMyStudents = async (req, res) => {
  const { id } = req.params;
  const exTeacher = await teacher.findById({ _id: id });
  if (!exTeacher) {
    return res
      .status(404)
      .send({ message: "No teachers found", success: false });
  }
  const myStudents = student
    .findOne({ teacher: exTeacher._id })
    .populate("teacher", "name email");
  if (!myQuizes) {
    return res.status(404).send({ message: "No quizes found", success: false });
  }
  res.status(200).send({ success: true, students: myStudents });
};

module.exports = {
  addStudent,
  addQuiz,
  getMyQuizes,
  getMyStudents,
};
