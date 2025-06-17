const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/login', adminController.showLogin);
router.post('/login', adminController.login);
router.get('/dashboard', adminController.dashboard);
router.get('/logout', adminController.logout);

module.exports = router;