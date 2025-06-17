const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/create', classController.showCreate);
router.post('/create', classController.create);
router.get('/list', classController.list);
router.post('/delete/:id', classController.delete); // Thêm dòng này

module.exports = router;