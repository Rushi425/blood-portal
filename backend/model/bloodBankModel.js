const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
  },
  operatingHours: {
    open: { type: String, required: true }, 
    close: { type: String, required: true },
  },
  appointments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, required: true },
      time: { type: String, required: true },
    },
  ],
}, {timestamps: true});

const BloodBank = mongoose.model("BloodBank", bloodBankSchema);

module.exports = BloodBank;
 