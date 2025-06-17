const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/add', studentController.showAddAndList);
router.post('/add', studentController.add);
router.get('/login', studentController.showLogin);
router.post('/login', studentController.login);
router.get('/info', studentController.info);
router.post('/delete/:id', studentController.delete);

module.exports = router;