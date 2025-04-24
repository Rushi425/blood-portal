import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../api/axios';

const BookAppointment = () => {
  const { bloodBankId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ date: '', time: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [buttonState, setButtonState] = useState('Book Appointment'); // Button state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonState('Booking...'); // Update button state to "Booking..."
    try {
      const response = await API.post('/book-appointment', { bloodBankId, ...formData });
      setSuccess('Appointment booked successfully!');
      setButtonState('Appointment Booked'); 
      setTimeout(() => navigate('/blood-banks'), 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to book appointment');
      setButtonState('Book Appointment'); // Reset button state on error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Book Appointment</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <label className="block mb-2">Select Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <label className="block mb-2">Select Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className={`w-full p-2 rounded ${
            buttonState === 'Booking...' ? 'bg-gray-400' : 'bg-red-600 text-white'
          }`}
          disabled={buttonState === 'Booking...'} // Disable button during booking
        >
          {buttonState}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;   