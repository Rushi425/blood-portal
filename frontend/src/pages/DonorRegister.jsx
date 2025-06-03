"use client"

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios"; // Keep axios if API is an axios instance, though API might abstract it
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // only this import
import { API } from "../api/axios.js"; // Assuming API is your configured axios instance
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Calendar,
  Droplet,
  Phone,
  Mail,
  Globe,
  Building as City,
  KeyRound,
  UserPlus,
  AlertCircle,
  Loader2,
  VenetianMask  as Gender
} from "lucide-react"; // Icons for inputs and messages

const DonorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { login } = useAuth(); // get login from context

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error on input change
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    // Age validation
    if (calculateAge(formData.dateOfBirth) < 18) {
      setError("You must be at least 18 years old to register.");
      setLoading(false); // Stop loading
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const regRes = await API.post("/register", formData, { withCredentials: true });

      if (regRes.data && regRes.data.error) {
        // If API returns an error field in data
        throw new Error(regRes.data.error);
      }

      // Auto login after successful registration
      await login({ email: formData.email, password: formData.password });

      // Redirect after login
      navigate("/donor-home");

    } catch (err) {
      console.error("Register error:", err);
      // Handle API errors or network issues
      setError(err.response?.data?.error || err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
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
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl relative z-10 border-t-4 border-red-600"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-2 text-red-700"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Donor Registration
        </motion.h2>
        <div className="h-1 w-20 bg-red-600 mx-auto mb-8"></div>

        <AnimatePresence>
          {error && (
            <motion.p
              key="error-message"
              className="text-red-600 text-sm mb-6 text-center flex items-center justify-center space-x-1 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle size={16} /> <span>{error}</span>
            </motion.p>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <User size={20} className="text-gray-400 ml-3" />
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>
          {/* Gender */}
          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.55 }}>
            <label className="block text-gray-700 font-semibold mb-1">Gender</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <Gender size={20} className="text-gray-400 ml-3" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none appearance-none pr-8" // Add padding-right and appearance-none for custom arrow
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {/* Optional: Custom arrow icon for select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </motion.div>
          {/* DOB */}
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <label className="block text-gray-700 font-semibold mb-1">Date of Birth</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <Calendar size={20} className="text-gray-400 ml-3" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>
          {/* Blood Group */}
          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.65 }}>
            <label className="block text-gray-700 font-semibold mb-1">Blood Group</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <Droplet size={20} className="text-gray-400 ml-3" />
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none appearance-none pr-8" // Add padding-right and appearance-none for custom arrow
                required
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {/* Optional: Custom arrow icon for select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </motion.div>
          {/* Phone */}
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
            <label className="block text-gray-700 font-semibold mb-1">Phone</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <Phone size={20} className="text-gray-400 ml-3" />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>
          {/* Email */}
          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.75 }}>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <Mail size={20} className="text-gray-400 ml-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>
          {/* State */}
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
            <label className="block text-gray-700 font-semibold mb-1">State</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <Globe size={20} className="text-gray-400 ml-3" />
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>
          {/* City */}
          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.85 }}>
            <label className="block text-gray-700 font-semibold mb-1">City</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <City size={20} className="text-gray-400 ml-3" />
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>
          {/* Pincode */}
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}>
            <label className="block text-gray-700 font-semibold mb-1">Pincode</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <KeyRound size={20} className="text-gray-400 ml-3" />
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>
          {/* Password */}
          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.95 }}>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
              <KeyRound size={20} className="text-gray-400 ml-3" /> {/* Using KeyRound for password input */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none"
                required
              />
            </div>
          </motion.div>
        </div>

        {/* Register Button */}
        <motion.button
          type="submit"
          disabled={loading} // Disable button while loading
          className="w-full mt-8 bg-red-600 text-white p-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-red-700 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Registering...
            </>
          ) : (
            <>
              <UserPlus size={20} /> Register
            </>
          )}
        </motion.button>

        {/* Link to Login */}
        <motion.div
          className="text-center mt-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/donor-login" className="text-red-600 hover:underline font-semibold">
              Login here
            </Link>
          </p>
        </motion.div>

      </motion.form>
    </motion.div>
  );
};

export default DonorRegister;