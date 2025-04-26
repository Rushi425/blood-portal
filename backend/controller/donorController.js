const User = require('../model/userModel');

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



module.exports = {
  getDonorProfile,
  updateDonorProfile,
  searchDonors,
  toggleAvailability
};