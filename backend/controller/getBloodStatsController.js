const User = require('../model/userModel');

const getBloodGroupStatistics = async (req, res) => {
  try {
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    const stats = await Promise.all(
      bloodGroups.map(async (group) => {
        const count = await User.countDocuments({
          bloodGroup: group,
          availability: true
        });
        return {
          group,
          donors: count
        };
      })
    );
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching blood group statistics:', error);
    res.status(500).json({
      error: 'Failed to fetch blood group statistics',
      details: error.message
    });
  }
};

module.exports = { getBloodGroupStatistics };
