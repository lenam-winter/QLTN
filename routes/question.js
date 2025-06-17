const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/add', questionController.showAddAndList);
router.post('/add', questionController.add);
router.get('/', questionController.showAddAndList);
// Route xoá câu hỏi
router.post('/delete/:id', questionController.delete);

module.exports = router;