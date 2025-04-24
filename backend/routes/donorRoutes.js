const express = require('express');
const { getDonorProfile, updateDonorProfile, searchDonors, toggleAvailability } = require('../controller/donorController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', verifyToken, getDonorProfile);
router.put('/update-profile', verifyToken, updateDonorProfile);
router.get('/search', searchDonors);
router.put('/toggle-availability', verifyToken, toggleAvailability);

module.exports = router;