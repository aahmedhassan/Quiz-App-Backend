const express = require('express')
const router = express.Router()
const { authenticateJWT } = require("../middleware/Token");
const {addStudent, addQuiz, getMyStudents, getMyQuizes} = require('../controllers/teacherController')


router.route('/addStudent/:id').post(authenticateJWT, addStudent)
router.route('/addQuiz/:id').post(authenticateJWT, addQuiz)

router.route('/getMyStudents/:id').get(authenticateJWT, getMyStudents)
router.route('getMyQuizes/:id').get(authenticateJWT, getMyQuizes)



module.exports = router;
