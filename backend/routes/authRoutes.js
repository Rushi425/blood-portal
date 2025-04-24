const express = require('express');
const { loginUser, logoutUser, registerUser } = require('../controller/userController.js');
const { getBloodBanks, addBloodBank } = require('../controller/bloodBankController.js');
const { getBloodGroupStatistics } = require('../controller/getBloodStatsController.js');
const { sendContactEmail } = require('../controller/contactController.js');

const router = express.Router();

// User registration and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Blood bank routes
router.post('/bloodbank', addBloodBank);
router.get('/bloodbanks', getBloodBanks);


// Send contact email
router.post('/contact', sendContactEmail);

// Statistics route
router.get('/statistics/blood-groups', getBloodGroupStatistics);

module.exports = router;