const BloodBank = require('../model/bloodBankModel');

const addBloodBank = async (req, res) => {
    try {
        const { name, address, city, state, pincode, phone, email, open, close } = req.body;

        const existingBloodBank = await BloodBank.findOne({ name });
        if (existingBloodBank) {
            return res.status(400).json({ error: 'Blood bank already exists in the database' });
        }

        const newBloodBank = new BloodBank({
            name,
            location: { address, city, state, pincode },
            contact: { phone, email },
            operatingHours: { open, close }
        });

        await newBloodBank.save();

        res.status(201).json({
            message: 'Blood bank added successfully',
            bloodBank: newBloodBank
        });
    } catch (error) {
        console.error('Error adding blood bank:', error);
        res.status(500).json({
            error: 'Failed to add blood bank',
            details: error.message
        });
    }
};

const getBloodBanks = async (req, res) => {
    try {
        const bloodBanks = await BloodBank.find().sort({ name: 1 });
        res.status(200).json(bloodBanks);
    } catch (error) {
        console.error('Error fetching blood banks:', error);
        res.status(500).json({
            error: 'Failed to fetch blood banks',
            details: error.message
        });
    }
};


module.exports = { addBloodBank, getBloodBanks };