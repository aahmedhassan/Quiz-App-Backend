const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {auth, admin} = require('./router')
const app = express()

app.use(express.json())
app.use(cors())
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('/auth', auth)
app.search('/admin', admin)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(404, 'Not found'));
  });

module.exports = app;