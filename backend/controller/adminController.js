const Admin = require('../model/adminModel');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); // Assuming you have a User model
const BloodBank = require('../model/bloodBankModel'); // Assuming you have a BloodBank model

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch Registered Users
exports.getRegisteredUsers = async (req, res) => {
  try {
    const users = await User.find(); // Assuming you have a User model
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch Blood Banks
exports.getBloodBanks = async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find(); // Assuming you have a BloodBank model
    res.status(200).json(bloodBanks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};