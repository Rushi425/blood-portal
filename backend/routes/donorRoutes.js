const express = require('express');
const {sendEmailsToDonors, getDonorProfile, updateDonorProfile, searchDonors, toggleAvailability } = require('../controller/donorController');
const { verifyToken } = require('../middleware/auth');
const { bookAppointment } = require('../controller/bookAppointmentController');

const router = express.Router();

router.get('/profile', verifyToken, getDonorProfile);
router.put('/update-profile', verifyToken, updateDonorProfile);
router.get('/search', searchDonors);
router.post("/send-email", sendEmailsToDonors);

router.put('/toggle-availability', verifyToken, toggleAvailability);
router.post('/book-appointment', verifyToken, bookAppointment);
module.exports = router;