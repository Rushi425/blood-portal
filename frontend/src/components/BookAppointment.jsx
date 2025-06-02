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
  LogIn,
  Shield,
  Mail
} from "lucide-react";

const BookAppointment = () => {
  const { bloodBankId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({ date: '', time: '' });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [buttonState, setButtonState] = useState('idle');
  const [step, setStep] = useState('otp'); // 'otp', 'terms', 'booking'
  const [termsAccepted, setTermsAccepted] = useState(false);

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

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError('');
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
    setError('');
  };

  const generateOTP = async () => {
    try {
      setButtonState('sending');
      const response = await API.post('/generate-otp', {}, { withCredentials: true });
      setSuccess('OTP sent to your email');
      setButtonState('sent');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send OTP');
      setButtonState('idle');
    }
  };

  const verifyOTP = async () => {
    try {
      setButtonState('verifying');
      const response = await API.post('/verify-otp', { otp }, { withCredentials: true });
      setSuccess('OTP verified successfully');
      setStep('terms');
      setButtonState('verified');
    } catch (error) {
      setError(error.response?.data?.error || 'Invalid OTP');
      setButtonState('idle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Please log in to book an appointment');
      return;
    }

    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
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
      case 'sending':
        return 'Sending OTP...';
      case 'verifying':
        return 'Verifying...';
      case 'booking':
        return 'Booking...';
      case 'booked':
        return 'Appointment Booked!';
      default:
        return step === 'otp' ? 'Verify OTP' : 'Book Appointment';
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
            {step === 'otp' && (
              <motion.div
                className="space-y-6"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-6">
                  <Mail size={40} className="mx-auto text-red-600 mb-4" />
                  <p className="text-gray-600">We'll send an OTP to your registered email for verification</p>
                </div>
                
                {buttonState !== 'sent' ? (
                  <button
                    type="button"
                    onClick={generateOTP}
                    disabled={buttonState === 'sending'}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    {buttonState === 'sending' ? (
                      <Loader2 size={20} className="animate-spin mr-2" />
                    ) : (
                      <Mail size={20} className="mr-2" />
                    )}
                    Send OTP
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
                      <Shield size={20} className="text-gray-400 ml-3" />
                      <input
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Enter 6-digit OTP"
                        className="w-full p-3 bg-transparent outline-none"
                        maxLength={6}
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={verifyOTP}
                      disabled={buttonState === 'verifying'}
                      className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      {buttonState === 'verifying' ? (
                        <Loader2 size={20} className="animate-spin mr-2" />
                      ) : (
                        <Shield size={20} className="mr-2" />
                      )}
                      Verify OTP
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {step === 'terms' && (
              <motion.div
                className="space-y-6"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h3 className="font-semibold text-gray-800">Important Terms and Conditions</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      I confirm that I am in good health and fit to donate blood
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      I have not had any major surgery in the last 6 months
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      I have not donated blood in the last 3 months
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      I am not under any medication that affects blood donation
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      I have had a proper meal before donation
                    </li>
                  </ul>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={handleTermsChange}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I have read and agree to all the terms and conditions above
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('booking')}
                  disabled={!termsAccepted}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Continue to Booking
                </button>
              </motion.div>
            )}

            {step === 'booking' && (
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

                <motion.button
                  type="submit"
                  disabled={buttonState === 'booking' || buttonState === 'booked'}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {buttonState === 'booking' ? (
                    <Loader2 size={20} className="animate-spin mr-2" />
                  ) : buttonState === 'booked' ? (
                    <CheckCircle2 size={20} className="mr-2" />
                  ) : (
                    <BookOpen size={20} className="mr-2" />
                  )}
                  {getButtonText()}
                </motion.button>
              </>
            )}
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
      </motion.form>
    </motion.div>
  );
};

export default BookAppointment;