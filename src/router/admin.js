const express = require("express");
const { authenticateJWT } = require("../middleware/Token");
const {
  addTeacher,
  getTeachers,
  getTeacher,
  getStudents,
  getStudent,
  getQuizes,
  getCourses,
} = require("../controllers/adminController");
const router = express.Router();

// create
router.route("/addTeacher").post(authenticateJWT, addTeacher);

//get
router.route("/getTeachers").get(authenticateJWT, getTeachers);
router.route("/getTeacher/:id").get(authenticateJWT, getTeacher); //teacher id
router.route("./getStudents").get(authenticateJWT, getStudents);
router.route("/getStudent/:id").get(authenticateJWT, getStudent); // student id
router.route("/getQuizes").get(authenticateJWT, getQuizes);
router.route("/getCourses").get(authenticateJWT, getCourses);

module.exports = router;
