const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/Token");
const {
  addCourse,
  addStudent,
  addQuiz,
  enrollStudents,
  getStudents,
  getCourseQuizes,
  addQuizCsv,
  getMyCourses,
} = require("../controllers/teacherController");

router.route("/addCourse/:id").post(authenticateJWT, addCourse); //teacher id
router.route("/addStudent/:id").post(authenticateJWT, addStudent); //teacher id
router.route("/addQuiz/:id").post(authenticateJWT, addQuiz); //course id
router.route("/addQuizCsv").post(authenticateJWT, addQuizCsv); //course id
router.route("/enrollStudents/:id").post(authenticateJWT, enrollStudents); //course id

router.route("/getMyCourses/:id").get(authenticateJWT, getMyCourses); //teacher id
router.route("/getStudents").get(authenticateJWT, getStudents);
router.route("/getCourseQuizes/:id").get(authenticateJWT, getCourseQuizes); //course id

module.exports = router;
