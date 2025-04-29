
import React, { useState } from "react";
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages on change
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation for time (ensure close is after open - optional)
    // You might add more robust validation here

    try {
      const response = await API.post("/bloodbank", formData, {
        withCredentials: true, // Keep this if needed for auth
      });

      if (response.status === 201) {
        setSuccess("Blood Bank added successfully! Redirecting...");
        setFormData({ // Reset form
          name: "", address: "", city: "", state: "", pincode: "",
          phone: "", email: "", open: "", close: "",
        });
        setTimeout(() => {
          navigate("/blood-banks"); // Navigate after a short delay
        }, 2500); // Increased delay to allow user to read success message
      } else {
         // Handle potential non-201 success codes if your API uses them
         setError(response.data?.message || "Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error adding blood bank:", err.response?.data || err.message);
      // Extract more specific error messages if available
      let errorMessage = "Failed to add blood bank. Please check your input and try again.";
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
         errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
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

          {/* Input Field: Email */}
           <motion.div variants={inputVariants}>
            <label htmlFor="email" className="flex items-center text-gray-700 font-medium mb-1">
               <Mail size={18} className="mr-2 text-red-600" />
              Email Address   
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., contact@bloodbank.com"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              // Removed required if it's optional
            />
          </motion.div>

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
               disabled={loading || success} // Disable if loading or after success
               className={`w-full flex items-center justify-center bg-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                 loading || success ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'
               }`}
               whileHover={{ scale: loading || success ? 1 : 1.03 }} // Prevent scale on disable
               whileTap={{ scale: loading || success ? 1 : 0.98 }}    // Prevent scale on disable
             >
               {loading ? (
                 <>
                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                   Adding Blood Bank...
                 </>
               ) : success ? (
                 <>
                  <CheckCircle className="mr-2 h-5 w-5"/>
                   Added Successfully!
                 </>
               ) : (
                 'Submit Blood Bank Details'
               )}
             </motion.button>
          </motion.div>

        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddBloodBank;