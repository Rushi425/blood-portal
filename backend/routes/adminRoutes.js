const express = require('express');
const { adminLogin, getRegisteredUsers, getBloodBanks } = require('../controller/adminController');
const router = express.Router();

router.post('/admin-login', adminLogin);
router.get('/admin-users', getRegisteredUsers);
router.get('/admin-blood-banks', getBloodBanks);

module.exports = router;