// filepath: /backend/src/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controller/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Profile data', user: req.user });
});

module.exports = router;