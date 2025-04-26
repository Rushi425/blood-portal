const User = require('../model/userModel');
const nodemailer = require("nodemailer");

// Get donor profile (protected)
const getDonorProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from verifyToken middleware
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching donor profile:', error);
    res.status(500).json({ error: 'Failed to fetch donor profile' });
  }
};

// Update donor profile (protected)
const updateDonorProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from verifyToken middleware
    const { name, bloodGroup, city, contact, availability } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, bloodGroup, city, contact, availability },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating donor profile:', error);
    res.status(500).json({ error: 'Failed to update donor profile' });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.availability = !user.availability;
    await user.save();

    res.json({ message: 'Availability updated successfully', availability: user.availability });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
};

// Search donors (public)
const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;

    if (!bloodGroup) {
      return res.status(400).json({ error: 'Blood group is required' });
    }

    const query = { bloodGroup, availability: true };
    if (location) {
      query.city = { $regex: location, $options: 'i' };
    }

    const donors = await User.find(query).select('-password');
    res.status(200).json(donors);
  } catch (error) {
    console.error('Error searching donors:', error);
    res.status(500).json({ error: 'Failed to search donors' });
  }
};

// Send emails to donors
const sendEmailsToDonors = async (req, res) => {
  const { seekerDetails, donors } = req.body;

  if (!seekerDetails || !donors || donors.length === 0) {
    return res.status(400).json({ error: "Invalid data provided" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Replace with your email password
    },
  });

  const emailPromises = donors.map((donor) => {
    const mailOptions = {
      from: "your-email@gmail.com",
      to: donor.email,
      subject: "Urgent Blood Donation Request",
      text: `
        Dear ${donor.fullName},

        A blood seeker has requested blood in your area. Here are the details:

        - Phone: ${seekerDetails.phone}
        - Message: ${seekerDetails.message}
        - Area: ${seekerDetails.area}
        - Blood Group: ${donor.bloodGroup}

        Please contact the seeker if you are available to donate.

        Thank you for your support!
      `,
    };

    return transporter.sendMail(mailOptions);
  });

  try {
    await Promise.all(emailPromises);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Failed to send emails" });
  }
};


module.exports = {
  getDonorProfile,
  updateDonorProfile,
  searchDonors,
  sendEmailsToDonors,
  toggleAvailability
};