import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming API uses axios internally or you might use fetch
import { useNavigate } from "react-router-dom";
import { API } from "../api/axios"; // Ensure this path is correct
import { motion } from "framer-motion";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2, // Icon for loading state
  Navigation, // Better icon for address/city/state
  Hash, // Icon for Pincode
  Map, // Icon for State
  Building2,
  CheckCircle2,
  Shield
} from "lucide-react";

const AddBloodBank = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    open: "",
    close: "",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [buttonState, setButtonState] = useState("idle"); // 'idle', 'sending', 'sent', 'verifying', 'verified', 'submitting'
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/profile");
      } catch (error) {
        if (error.response?.status === 401) {
          setError("Please log in to add a blood bank");
          setTimeout(() => navigate("/donor-login"), 2000);
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages on change
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const generateOTP = async () => {
    if (!formData.email) {
      setError("Please enter email address first");
      return;
    }

    try {
      setButtonState("sending");
      const response = await API.post("/generate-bank-otp", { email: formData.email });
      setSuccess("Verification code sent to your email");
      setButtonState("sent");
    } catch (error) {
      console.error("OTP generation error:", error);
      if (error.response?.status === 401) {
        setError("Please log in to continue");
        setTimeout(() => navigate("/donor-login"), 2000);
      } else {
        setError(error.response?.data?.error || "Failed to send verification code");
      }
      setButtonState("idle");
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      setError("Please enter the verification code");
      return;
    }

    try {
      setButtonState("verifying");
      const response = await API.post("/verify-bank-otp", {
        email: formData.email,
        otp
      });
      setSuccess("Email verified successfully");
      setButtonState("verified");
      setIsEmailVerified(true);
    } catch (error) {
      console.error("OTP verification error:", error);
      if (error.response?.status === 401) {
        setError("Please log in to continue");
        setTimeout(() => navigate("/donor-login"), 2000);
      } else {
        setError(error.response?.data?.error || "Invalid verification code");
      }
      setButtonState("idle");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      setError("Please verify your email first");
      return;
    }

    setButtonState("submitting");
    setError("");
    setSuccess("");

    try {
      const response = await API.post("/add-bloodbank", formData, {
        withCredentials: true // Important for sending cookies
      });
      setSuccess("Blood bank added successfully!");
      setTimeout(() => navigate("/blood-banks"), 2000);
    } catch (error) {
      console.error("Blood bank submission error:", error);
      if (error.response?.status === 401) {
        setError("Please log in to add a blood bank");
        setTimeout(() => navigate("/donor-login"), 2000);
      } else {
        setError(error.response?.data?.error || "Failed to add blood bank");
      }
      setButtonState("idle");
    }
  };

  // Animation variants for form elements
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
     hidden: { opacity: 0 },
     visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-red-100 to-white flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 md:p-12 relative overflow-hidden border-t-4 border-red-600"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full opacity-80 -z-1"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-red-50 rounded-tr-full opacity-80 -z-1"></div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-red-700 text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Add New Blood Bank
        </motion.h1>
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>

        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AlertCircle className="mr-3 h-5 w-5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4"
               initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle className="mr-3 h-5 w-5" />
              <span>{success}</span>
            </motion.div>
          )}

          {/* Input Field: Name */}
          <motion.div variants={inputVariants}>
            <label htmlFor="name" className="flex items-center text-gray-700 font-medium mb-1">
              <Building size={18} className="mr-2 text-red-600" />
              Blood Bank Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., City Central Blood Bank"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              required
            />
          </motion.div>

          {/* Input Field: Email with OTP Verification */}
          <motion.div variants={inputVariants}>
            <label htmlFor="email" className="flex items-center text-gray-700 font-medium mb-1">
              <Mail size={18} className="mr-2 text-red-600" />
              Email Address
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., contact@bloodbank.com"
                className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                required
                disabled={isEmailVerified}
              />
              {!isEmailVerified && (
                <button
                  type="button"
                  onClick={generateOTP}
                  disabled={buttonState === "sending" || buttonState === "verifying"}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  {buttonState === "sending" ? (
                    <Loader2 size={20} className="animate-spin mr-2" />
                  ) : (
                    <Mail size={20} className="mr-2" />
                  )}
                  {buttonState === "sent" ? "Resend Code" : "Send Code"}
                </button>
              )}
            </div>
            {buttonState === "sent" && !isEmailVerified && (
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter 6-digit code"
                  className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={verifyOTP}
                  disabled={buttonState === "verifying"}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  {buttonState === "verifying" ? (
                    <Loader2 size={20} className="animate-spin mr-2" />
                  ) : (
                    <Shield size={20} className="mr-2" />
                  )}
                  Verify
                </button>
              </div>
            )}
          </motion.div>

          {/* Input Field: Address */}
          <motion.div variants={inputVariants}>
            <label htmlFor="address" className="flex items-center text-gray-700 font-medium mb-1">
              <Navigation size={18} className="mr-2 text-red-600" />
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main Street, Unit 5"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              required
            />
          </motion.div>

          {/* Grid for City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={inputVariants}>
              <label htmlFor="city" className="flex items-center text-gray-700 font-medium mb-1">
                 <MapPin size={18} className="mr-2 text-red-600" />
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Metropolis"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                required
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <label htmlFor="state" className="flex items-center text-gray-700 font-medium mb-1">
                 <Map size={18} className="mr-2 text-red-600" />
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g., StateName"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                required
              />
            </motion.div>
          </div>

          {/* Grid for Pincode and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <motion.div variants={inputVariants}>
              <label htmlFor="pincode" className="flex items-center text-gray-700 font-medium mb-1">
                 <Hash size={18} className="mr-2 text-red-600" />
                Pincode
              </label>
              <input
                type="number" // Use number for better mobile UX, but keep validation
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="e.g., 123456"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // Hide number spinners
                required
                min="100000"
                max="999999"
                pattern="\d{6}" // Still good practice for pattern
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <label htmlFor="phone" className="flex items-center text-gray-700 font-medium mb-1">
                 <Phone size={18} className="mr-2 text-red-600" />
                Phone Number
              </label>
              <input
                type="tel" // Use tel type for semantics
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., 9876543210"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                required
                pattern="[0-9]{10}" // Standard 10-digit pattern
                title="Please enter a 10-digit phone number"
              />
            </motion.div>
          </div>

          {/* Grid for Open and Close Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <motion.div variants={inputVariants}>
              <label htmlFor="open" className="flex items-center text-gray-700 font-medium mb-1">
                 <Clock size={18} className="mr-2 text-red-600" />
                Opens At
              </label>
              <input
                type="time"
                id="open"
                name="open"
                value={formData.open}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                required
              />
            </motion.div>
             <motion.div variants={inputVariants}>
              <label htmlFor="close" className="flex items-center text-gray-700 font-medium mb-1">
                 <Clock size={18} className="mr-2 text-red-600" />
                Closes At
              </label>
              <input
                type="time"
                id="close"
                name="close"
                value={formData.close}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                required
              />
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
             variants={inputVariants} // Apply variant to the container div
             className="pt-4" // Add some padding top before the button
          >
             <motion.button
               type="submit"
               disabled={!isEmailVerified || buttonState === "submitting"}
               className={`w-full flex items-center justify-center bg-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                 !isEmailVerified || buttonState === "submitting" ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'
               }`}
               whileHover={{ scale: !isEmailVerified || buttonState === "submitting" ? 1 : 1.03 }} // Prevent scale on disable
               whileTap={{ scale: !isEmailVerified || buttonState === "submitting" ? 1 : 0.98 }}    // Prevent scale on disable
             >
               {buttonState === "submitting" ? (
                 <>
                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                   Adding Blood Bank...
                 </>
               ) : (
                 <Building2 size={20} className="mr-2" />
               )}
               {buttonState === "submitting" ? "Adding Blood Bank..." : "Add Blood Bank"}
             </motion.button>
          </motion.div>

        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddBloodBank;