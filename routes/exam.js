const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.get('/add', examController.showAddAndList);
router.post('/add', examController.add);
router.get('/', examController.showAddAndList);

module.exports = router;