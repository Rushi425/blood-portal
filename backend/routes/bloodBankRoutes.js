const express = require('express');
const { addBloodBank } = require('../controller/bloodBankController');
const { generateAndSendBankOTP, verifyBankOTP } = require('../controller/otpController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Public OTP routes for blood bank registration
router.post('/generate-bank-otp', generateAndSendBankOTP);
router.post('/verify-bank-otp', verifyBankOTP);

// Protected route for adding blood bank
router.post('/add-bloodbank', verifyToken, addBloodBank);

module.exports = router;