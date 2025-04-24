const express = require('express');
const router = express.Router();
const User = require('../model/userModel');

// Route to get count of each blood group
router.get('/blood-group-stats', async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $match: { availability: true } // only available donors
      },
      {
        $group: {
          _id: "$bloodGroup",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          bloodGroup: "$_id",
          count: 1,
          _id: 0
        }
      },
      {
        $sort: { bloodGroup: 1 }
      }
    ]);

    res.json(stats);
  } catch (error) {
    console.error('Error fetching blood group stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
