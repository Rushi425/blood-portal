"use client"

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Assuming AuthContext is correctly imported
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, AlertCircle, Loader2 } from "lucide-react"; // Icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // The actual login logic from AuthContext
      const success = await login({ email, password });

      if (success) {
        // Navigate on successful login
        navigate("/donor-home");
      } else {
        // Handle login failure from the context logic
        setError("Invalid email or password. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Handle unexpected errors during the login process
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false); // Ensure loading is set to false regardless of outcome
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
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm relative z-10 border-t-4 border-red-600"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center mb-2 text-red-700"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Donor Login
        </motion.h1>
        <div className="h-1 w-16 bg-red-600 mx-auto mb-8"></div>

        <AnimatePresence>
          {error && (
            <motion.p
              key="error-message"
              className="text-red-600 text-sm mb-4 text-center flex items-center justify-center space-x-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle size={16} /> <span>{error}</span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Email Input */}
        <motion.div
          className="mb-4"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
            <Mail size={20} className="text-gray-400 ml-3" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-transparent outline-none"
              required
            />
          </div>
        </motion.div>

        {/* Password Input */}
        <motion.div
          className="mb-4"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <div className="relative flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 transition-all">
            <Lock size={20} className="text-gray-400 ml-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 bg-transparent outline-none" // Add padding-right for icon
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Forgot Password Link */}
        <motion.div
          className="text-right mb-6" // Align to right
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link to="/forgot-password" className="text-sm text-red-600 hover:underline font-medium">
            Forgot Password?
          </Link>
        </motion.div>

        {/* Login Button */}
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-red-700 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Logging in...
            </>
          ) : (
            <>
              <LogIn size={20} /> Login
            </>
          )}
        </motion.button>

        {/* Register Here Link */}
        <motion.div
          className="text-center mt-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link to="/donor-register" className="text-red-600 hover:underline font-semibold">
              Register here
            </Link>
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Login;