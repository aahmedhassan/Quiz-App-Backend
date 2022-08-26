const admin = require("../models/users/admin");
const teacher = require("../models/users/teacher");
const student = require("../models/users/student");
const quiz = require("../models/quiz/quiz");

//create

const addTeacher = async (req, res) => {
  try {
    const { name, email, password, role, qualification } = req.body;
    const exTeacher = await teacher.findOne({ email: email });
    if (exTeacher) {
      return res
        .status(400)
        .send({ message: "teacher already present", success: false });
    }
    const newTeacher = new teacher({
      name: name,
      email: email,
      password: password,
      role: role,
      qualification: qualification,
    });
    newTeacher.save();
    res.status(200).send({ message: "teacher created", success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await teacher.find({});
    if (teachers.length < 0) {
      return res
        .status(404)
        .send({ message: "No teachers found", success: false });
    }
    res.status(200).send({ teachers: teachers, success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const exTeacher = await teacher.findById({ _id: id });
    if (!exTeacher) {
      return res
        .status(404)
        .send({ message: "Teacher not found", success: false });
    }
    res.status(200).send({ teacher: exTeacher, success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await student.find({});
    if (students.length < 0) {
      return res
        .status(404)
        .send({ message: "No students found", success: false });
    }
    res.status(200).send({ students: students, success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const exStudent = await student.findById({ _id: id });
    if (!exStudent) {
      return res
        .status(404)
        .send({ message: "Student not found", success: false });
    }
    res.status(200).send({ student: exStudent, success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

const getQuizes = async (req, res) => {
  try {
    const quizes = await quiz.find({});
    if (quizes.length < 0) {
      return res
        .status(404)
        .send({ message: "No quizess found", success: false });
    }
    res.status(200).send({ quizes: quizes, success: true });
  } catch (error) {
    res.status(500).send({ error: error, success: false });
  }
};

module.exports = {
  addTeacher,
  getTeachers,
  getTeacher,
  getStudents,
  getStudent,
  getQuizes,
};
