"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BookOpen,
  LogIn
} from "lucide-react";

const BookAppointment = () => {
  const { bloodBankId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({ date: '', time: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [buttonState, setButtonState] = useState('idle');

  useEffect(() => {
    if (!isAuthenticated) {
      setError('Please log in to book an appointment');
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
    setButtonState('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Please log in to book an appointment');
      return;
    }

    setButtonState('booking');
    setError('');
    setSuccess('');

    if (!formData.date || !formData.time) {
      setError("Please select both date and time.");
      setButtonState('idle');
      return;
    }

    try {
      const response = await API.post('/book-appointment', 
        { bloodBankId, ...formData }, 
        { withCredentials: true }
      );

      if (response.data && response.data.error) {
        throw new Error(response.data.error);
      }

      setSuccess('Appointment booked successfully!');
      setButtonState('booked');
      setTimeout(() => navigate('/blood-banks'), 2000);

    } catch (error) {
      console.error('Appointment booking error:', error);
      if (error.response?.status === 401) {
        setError('Please log in to book an appointment');
        setTimeout(() => navigate('/donor-login'), 2000);
      } else {
        setError(error.response?.data?.error || error.message || 'Failed to book appointment. Please try again.');
      }
      setButtonState('idle');
    }
  };

  const getButtonText = () => {
    if (!isAuthenticated) return 'Login to Book';
    switch (buttonState) {
      case 'booking':
        return 'Booking...';
      case 'booked':
        return 'Appointment Booked!';
      default:
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
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(239,68,68,0.1)_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative z-10 border-t-4 border-red-600"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1
          className="text-3xl font-bold text-red-700 text-center mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Book Appointment
        </motion.h1>
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error-message"
              className="text-red-600 text-center mb-6 flex items-center justify-center space-x-1 font-medium"
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
              className="text-green-600 text-center mb-6 flex items-center justify-center space-x-1 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle2 size={18} /> <span>{success}</span>
            </motion.p>
          )}
        </AnimatePresence>

        {isAuthenticated ? (
          <>
            <motion.div
              className="mb-6"
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
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="mb-6"
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
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 mb-4">Please log in to book an appointment</p>
            <button
              type="button"
              onClick={() => navigate('/donor-login')}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogIn size={20} className="mr-2" />
              Go to Login
            </button>
          </motion.div>
        )}

        {isAuthenticated && (
          <motion.button
            type="submit"
            disabled={buttonState === 'booking' || buttonState === 'booked'}
            className={`w-full p-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2
              ${buttonState === 'booked'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white hover:bg-red-700'}
              ${buttonState === 'booking' || buttonState === 'booked' ? 'opacity-60 cursor-not-allowed' : ''}
            `}
            whileHover={{ scale: buttonState === 'idle' ? 1.02 : 1 }}
            whileTap={{ scale: buttonState === 'idle' ? 0.98 : 1 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {buttonState === 'booking' && <Loader2 className="animate-spin" size={20} />}
            {buttonState !== 'booking' && <BookOpen size={20} />}
            <span>{getButtonText()}</span>
          </motion.button>
        )}
      </motion.form>
    </motion.div>
  );
};

export default BookAppointment;