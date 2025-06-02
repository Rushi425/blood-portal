const BloodBank = require('../model/bloodBankModel');
const User = require('../model/userModel');
const Appointment = require('../model/appointmentModel');
const nodemailer = require('nodemailer');

const bookAppointment = async (req, res) => {
  try {
    const { bloodBankId, date, time } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!bloodBankId || !date || !time) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check blood bank existence
    const bloodBank = await BloodBank.findById(bloodBankId);
    if (!bloodBank) {
      return res.status(404).json({ error: 'Blood bank not found' });
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create appointment in Appointment collection
    const appointment = await Appointment.create({
      user: userId,
      userName: user.fullName,
      bloodBank: bloodBankId,
      bloodBankName: bloodBank.name,
      date,
      time,
    });

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content with user and appointment details
    const mailOptions = {
      from: `"RedLink" <${process.env.EMAIL_USER}>`,
      to: bloodBank.contact.email,
      subject: 'New Appointment Booking',
      html: `
        <h3>New Appointment Booking</h3>
        <p><strong>User Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${user.fullName}</li>
          <li><strong>Email:</strong> ${user.email}</li>
          <li><strong>Phone:</strong> ${user.phone}</li>
          <li><strong>Gender:</strong> ${user.gender}</li>
          <li><strong>Blood Group:</strong> ${user.bloodGroup}</li>
          <li><strong>City:</strong> ${user.city}</li>
          <li><strong>State:</strong> ${user.state}</li>
          <li><strong>Pincode:</strong> ${user.pincode}</li>
        </ul>
        <p><strong>Appointment Details:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to book appointment',
      details: error.message 
    });
  }
};

module.exports = { bookAppointment };
