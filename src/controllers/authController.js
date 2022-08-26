const admin = require("../models/users/admin");
const teacher = require("../models/users/teacher");
const student = require("../models/users/student");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { role, email, password } = req.body;
  if (role.toLowerCase() === "admin") {
    try {
      const exAdmin = await admin.findOne({ email: email });
      if (!exAdmin) {
        return res
          .status(404)
          .send({ success: false, message: "user not found" });
      }
      const validate = await bcrypt.compare(password, exAdmin.password);
      if (!validate) {
        return res
          .status(401)
          .send({ message: "Invalid password", success: false });
      }
      const token = jwt.sign(
        { id: exAdmin._id, role: exAdmin.role },
        "TOKEN_SECRET"
      ); //hide token secret

      return res.status(200).send({
        token: token,
        user: exAdmin,
        role: "admin",
        message: "Logged in",
        success: true,
      });
    } catch (error) {
      res.status(500).send({ error: error, success: false });
    }
  }
  if (role.toLowerCase() === "teacher") {
    try {
      const exTeacher = await teacher.findOne({ email: email });
      if (!exTeacher) {
        return res
          .status(404)
          .send({ success: false, message: "user not found" });
      }
      const validate = await bcrypt.compare(password, exTeacher.password);
      if (!validate) {
        return res
          .status(401)
          .send({ message: "Invalid password", success: false });
      }
      const token = jwt.sign(
        { id: exTeacher, role: exTeacher.role },
        "TOKEN_SECRET"
      ); //hide token secret
      return res.status(200).send({
        token: token,
        user: exTeacher,
        role: "teacher",
        message: "Logged in",
        success: true,
      });
    } catch (error) {
      res.status(500).send({ error: error, success: false });
    }
  }
  if (role.toLowerCase() === "student") {
    try {
      const exStudent = await student.findOne({ email: email });
      if (!exStudent) {
        return res
          .status(404)
          .send({ success: false, message: "user not found" });
      }
      const validate = await bcrypt.compare(password, exStudent.password);
      if (!validate) {
        return res
          .status(401)
          .send({ message: "Invalid password", success: false });
      }
      const token = jwt.sign(
        { id: exStudent, role: exStudent.role },
        "TOKEN_SECRET"
      ); //hide token secret
      return res.status(200).send({
        token: token,
        user: exStudent,
        role: "student",
        message: "Logged in",
        success: true,
      });
    } catch (error) {
      res.status(500).send({ error: error, success: false });
    }
  }
  return res.status(404).send({ success: false, message: "user not found" });
};

module.exports = {
  login,
};
