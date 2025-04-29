"use client"

import React, { useState } from "react";
import axios from "axios";
import { API } from "../api/axios"; // Assuming your API is correctly imported
import { motion } from "framer-motion";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react"; // Using Lucide Icons for consistency

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState(""); // 'idle', 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await API.post('/contact', formData, {
        withCredentials: true,
      });
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" }); // Clear form on success
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus("error");
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex items-center justify-center py-10 px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle Background Pattern (similar to Home) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(239,68,68,0.1)_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>


      <motion.div
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg relative z-10 border-t-4 border-red-600"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1
          className="text-4xl font-bold text-red-700 text-center mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Get in Touch
        </motion.h1>
        <div className="h-1 w-20 bg-red-600 mx-auto mb-6"></div>

        <motion.p
          className="text-lg text-gray-600 text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          We would love to hear from you!
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
            <div className="flex items-center border rounded-md shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
                <User size={20} className="text-gray-400 ml-3" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
            <div className="flex items-center border rounded-md shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
                <Phone size={20} className="text-gray-400 ml-3" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <div className="flex items-center border rounded-md shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
                <Mail size={20} className="text-gray-400 ml-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <label className="block text-gray-700 font-semibold mb-1">Your Message</label>
            <div className="flex items-start border rounded-md shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
                <MessageSquare size={20} className="text-gray-400 ml-3 mt-3" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                className="w-full mt-1 px-3 py-2 bg-transparent outline-none h-32"
                required
              ></textarea>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {status === "sending" ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1-2.647zm10 0l1 2.647c1.865-2.114 3-4.896 3-7.938h-4a7.962 7.962 0 01-2 5.291z"></path></svg>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send Message</span>
              </>
            )}
          </motion.button>

          {status === "success" && (
            <motion.p
              className="text-green-600 text-center font-semibold mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Message sent successfully! Thank you for reaching out.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              className="text-red-600 text-center font-semibold mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Failed to send message. Please check your connection and try again.
            </motion.p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;