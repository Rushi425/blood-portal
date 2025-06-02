const OTP = require('../model/otpModel');
const User = require('../model/userModel');
const nodemailer = require('nodemailer');

// Generate and send OTP
const generateAndSendOTP = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP to database
    await OTP.findOneAndUpdate(
      { email: user.email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP email
    const mailOptions = {
      from: `"RedLink" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Your OTP for RedLink ',
      html: `
        <h3>Your OTP </h3>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 2 minutes.</p>
        <p>Please do not share this OTP with anyone.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const otpRecord = await OTP.findOne({ 
      email: user.email,
      otp: otp
    });

    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Delete the OTP after successful verification
    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: 'OTP verified successfully' });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

// Generate and send OTP for blood bank registration
const generateAndSendBankOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP to database
    await OTP.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP email
    const mailOptions = {
      from: `"RedLink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Blood Bank Email',
      html: `
        <h3>Verify Your Blood Bank Email</h3>
        <p>Your verification code is: <strong>${otp}</strong></p>
        <p>This code will expire in 2 minutes.</p>
        <p>Please do not share this code with anyone.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Verification code sent successfully' });

  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ error: 'Failed to send verification code' });
  }
};

// Verify OTP for blood bank registration
const verifyBankOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const otpRecord = await OTP.findOne({ 
      email,
      otp
    });

    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Delete the OTP after successful verification
    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: 'Email verified successfully' });

  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({ error: 'Failed to verify code' });
  }
};

module.exports = {
  generateAndSendOTP,
  verifyOTP,
  generateAndSendBankOTP,
  verifyBankOTP
}; 