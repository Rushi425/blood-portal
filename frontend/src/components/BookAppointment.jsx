"use client"

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../api/axios'; // Assuming API is your configured axios instance
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2, // Spinner icon
  BookOpen // Icon for the book button
} from "lucide-react"; // Icons

const BookAppointment = () => {
  const { bloodBankId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ date: '', time: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [buttonState, setButtonState] = useState('idle'); // 'idle', 'booking', 'booked', 'error' for button state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
    setSuccess(''); // Clear success on input change
    setButtonState('idle'); // Reset button state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonState('booking'); // Update button state to "booking"
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages

    // Basic validation
    if (!formData.date || !formData.time) {
      setError("Please select both date and time.");
      setButtonState('idle');
      return;
    }

    try {
      const response = await API.post('/book-appointment', { bloodBankId, ...formData }, { withCredentials: true });

      if (response.data && response.data.error) {
        // Handle API-specific errors if your backend sends them this way
        throw new Error(response.data.error);
      }

      setSuccess('Appointment booked successfully!');
      setButtonState('booked'); // Update button state to "booked"
      // Navigate after a short delay to allow user to see success message
      setTimeout(() => navigate('/blood-banks'), 2000);

    } catch (error) {
      console.error('Appointment booking error:', error);
      setError(error.response?.data?.error || error.message || 'Failed to book appointment. Please try again.');
      setButtonState('idle'); // Reset button state on error
    }
  };

  const getButtonText = () => {
    switch (buttonState) {
      case 'booking':
        return 'Booking...';
      case 'booked':
        return 'Appointment Booked!';
      default: // 'idle' or 'error'
        return 'Book Appointment';
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(239,68,68,0.1)_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative z-10 border-t-4 border-red-600" // Consistent card styling
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1
          className="text-3xl font-bold text-red-700 text-center mb-2" // Consistent heading styling
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Book Appointment
        </motion.h1>
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div> {/* Red separator line */}

        {/* Messages (Error/Success) */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error-message"
              className="text-red-600 text-center mb-6 flex items-center justify-center space-x-1 font-medium" // Consistent error styling
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle size={18} /> <span>{error}</span>
            </motion.p>
          )}
          {success && (
            <motion.p
              key="success-message"
              className="text-green-600 text-center mb-6 flex items-center justify-center space-x-1 font-medium" // Consistent success styling
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle2 size={18} /> <span>{success}</span>
            </motion.p>
          )}
        </AnimatePresence>


        {/* Date Input */}
        <motion.div
          className="mb-6" // Added more bottom margin
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="block text-gray-700 font-semibold mb-1">Select Date</label>
          <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
            <Calendar size={20} className="text-gray-400 ml-3" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 bg-transparent outline-none" // Consistent input styling
              required
            />
          </div>
        </motion.div>

        {/* Time Input */}
        <motion.div
          className="mb-6" // Added more bottom margin
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label className="block text-gray-700 font-semibold mb-1">Select Time</label>
          <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
            <Clock size={20} className="text-gray-400 ml-3" />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 bg-transparent outline-none" // Consistent input styling
              required
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={buttonState === 'booking' || buttonState === 'booked'} // Disable when booking or booked
          className={`w-full p-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2
            ${buttonState === 'booked'
              ? 'bg-green-600 text-white' // Green when booked
              : 'bg-red-600 text-white hover:bg-red-700'} // Red otherwise
            ${buttonState === 'booking' || buttonState === 'booked' ? 'opacity-60 cursor-not-allowed' : ''} // Disable styles
          `}
          whileHover={{ scale: buttonState === 'idle' ? 1.02 : 1 }} // Scale only when idle
          whileTap={{ scale: buttonState === 'idle' ? 0.98 : 1 }} // Tap only when idle
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {buttonState === 'booking' && <Loader2 className="animate-spin" size={20} />}
          {buttonState !== 'booking' && <BookOpen size={20} />}
          <span>{getButtonText()}</span>
        </motion.button>

      </motion.form>
    </motion.div>
  );
};

export default BookAppointment;