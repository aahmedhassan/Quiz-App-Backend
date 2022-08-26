const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { auth, admin, teacher } = require("./router");
const ApiError = require('./utils/ApiError')
const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/teacher", teacher);

app.get("/", (req, res) => {
  res.send("Api for Quiz Application");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

module.exports = app;
