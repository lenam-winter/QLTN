const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/add', sessionController.showAdd);
router.post('/add', sessionController.add);
router.get('/student', sessionController.listForStudent);
router.get('/start-exam/:sessionId', sessionController.startExam);
router.post('/submit-exam/:sessionId', sessionController.submitExam);

module.exports = router;