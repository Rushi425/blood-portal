const express = require('express');
const { adminLogin, getRegisteredUsers, getBloodBanks, adminLogout } = require('../controller/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/admin-login', adminLogin);
router.post('/admin-logout', adminLogout);

router.get('/admin-users', protect, getRegisteredUsers);
router.get('/admin-blood-banks', protect, getBloodBanks);

module.exports = router;