const express = require('express');
const {sendEmailsToDonors, getDonorProfile, updateDonorProfile, searchDonors, toggleAvailability } = require('../controller/donorController');
const { verifyToken } = require('../middleware/auth');
const { bookAppointment } = require('../controller/bookAppointmentController');
const { generateAndSendOTP, verifyOTP } = require('../controller/otpController');

const router = express.Router();

router.get('/profile', verifyToken, getDonorProfile);
router.put('/profile', verifyToken, updateDonorProfile);
router.get('/search', searchDonors);
router.post('/toggle-availability', verifyToken, toggleAvailability);
router.post('/send-emails', verifyToken, sendEmailsToDonors);

// OTP routes
router.post('/generate-otp', verifyToken, generateAndSendOTP);
router.post('/verify-otp', verifyToken, verifyOTP);

router.post('/book-appointment', verifyToken, bookAppointment);

module.exports = router;