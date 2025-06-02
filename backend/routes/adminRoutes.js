const express = require('express');
const { adminLogin, getRegisteredUsers, getBloodBanks, adminLogout, deleteUser, deleteBloodBank } = require('../controller/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/admin-login', adminLogin);
router.post('/admin-logout', adminLogout);

router.get('/admin-users', protect, getRegisteredUsers);
router.get('/admin-blood-banks', protect, getBloodBanks);
router.delete('/delete-user/:id', protect, deleteUser);
router.delete('/delete-bloodbank/:id', protect, deleteBloodBank);

module.exports = router;