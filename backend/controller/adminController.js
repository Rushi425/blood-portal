const Admin = require('../model/adminModel');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); // Assuming you have a User model
const BloodBank = require('../model/bloodBankModel'); // Assuming you have a BloodBank model
const Appointment = require('../model/appointmentModel');

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600000 // 1 hour
    });
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin Logout
// exports.adminLogout = (req, res) => {
//   res.clearCookie('token', { path: '/' });
//   res.status(200).json({ message: 'Logout successful' });
// };
exports.adminLogout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
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

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a blood bank
exports.deleteBloodBank = async (req, res) => {
  try {
    const { id } = req.params;
    const bloodBank = await BloodBank.findByIdAndDelete(id);
    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }
    res.status(200).json({ message: 'Blood bank deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch appointments by status
exports.getAppointmentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be either pending or completed' });
    }
    
    const appointments = await Appointment.find({ status })
      .sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};