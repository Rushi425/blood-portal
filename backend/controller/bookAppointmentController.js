const BloodBank = require('../model/bloodBankModel');
const User = require('../model/userModel');
const Appointment = require('../model/appointmentModel');

const nodemailer = require('nodemailer');

const bookAppointment = async (req, res) => {
  try {
    console.log('Received appointment request:', req.body);
    console.log('User ID from request:', req.user?.id);

    const { bloodBankId, date, time } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!bloodBankId || !date || !time) {
      console.log('Missing required fields:', { bloodBankId, date, time });
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check blood bank existence
    const bloodBank = await BloodBank.findById(bloodBankId);
    if (!bloodBank) {
      console.log('Blood bank not found for ID:', bloodBankId);
      return res.status(404).json({ error: 'Blood bank not found' });
    }
    console.log('Found blood bank:', bloodBank.name);

    // Create appointment in Appointment collection
    try {
      const appointment = await Appointment.create({
        user: userId,
        bloodBank: bloodBankId,
        date,
        time,
      });
      console.log('Successfully created appointment:', appointment);

      // Fetch user details
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found for ID:', userId);
        return res.status(404).json({ error: 'User not found' });
      }
      console.log('Found user:', user.fullName);

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
      console.log('Email sent successfully');

      res.status(201).json({
        message: 'Appointment booked successfully',
        appointment,
      });
    } catch (appointmentError) {
      console.error('Error creating appointment:', appointmentError);
      throw appointmentError;
    }
  } catch (error) {
    console.error('Error in bookAppointment:', error);
    res.status(500).json({ 
      error: 'Failed to book appointment',
      details: error.message 
    });
  }
};

module.exports = { bookAppointment };
