import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api/axios"; // Ensure this path is correct
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, // Icon for Blood Bank Name
  MapPin,    // Icon for Location
  Phone,     // Icon for Phone
  Mail,      // Icon for Email
  Clock,     // Icon for Hours
  CalendarPlus, // Icon for Book Appointment
  PlusCircle, // Icon for Add New
  Loader2,    // Icon for Loading
  AlertCircle, // Icon for Error
  Info,       // Icon for No Banks Found
} from 'lucide-react';

const BloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth(); // Get auth status from context

  useEffect(() => {
    const fetchBloodBanks = async () => {
      setLoading(true); // Start loading
      setError(""); // Clear previous errors
      try {
        // Fetch blood banks - ensure credentials are sent if needed by your backend setup
        const response = await API.get('/bloodbanks', {
          withCredentials: true, // Keep this if your API requires cookies/session info
        });

        // Validate response data
        if (Array.isArray(response?.data)) {
          setBloodBanks(response.data);
        } else {
          console.warn("Received non-array data for blood banks:", response?.data);
          setBloodBanks([]); // Set to empty array if data is not as expected
          setError("Received unexpected data format from server.");
        }

      } catch (err) {
        console.error("Error fetching blood banks:", err);
        // Provide a more specific error message if possible
        setError(err.response?.data?.message || err.message || "Failed to fetch blood banks. Please try again later.");
        setBloodBanks([]); // Clear data on error
      } finally {
        setLoading(false); // Stop loading regardless of outcome
      }
    };

    fetchBloodBanks();
  }, []); // Empty dependency array means this runs once on mount

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation of children (cards)
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-gray-50 to-white pt-10 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4 sm:mb-0">
            Available Blood Banks
          </h1>
          {/* "Add New" Button - Positioned top right */}
          <Link to="/add-bloodbank">
            <motion.button
              className="flex items-center bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle size={20} className="mr-2" />
              Add New Blood Bank
            </motion.button>
          </Link>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-red-600 animate-spin" />
            <span className="ml-4 text-lg text-gray-600">Loading Blood Banks...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center text-center bg-red-50 border border-red-200 p-6 rounded-lg shadow-sm">
            <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
            <p className="text-red-700 font-semibold mb-1">Oops! Something went wrong.</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Content: Grid of Blood Banks or No Banks Message */}
        {!loading && !error && (
          <>
            {bloodBanks.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {bloodBanks.map((bank) => (
                  <motion.div
                    key={bank._id}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between overflow-hidden relative" // Added relative for potential future absolute elements
                    variants={cardVariants}
                    whileHover="hover" // Apply hover variant
                  >
                    <div> {/* Content wrapper */}
                      {/* Bank Name */}
                      <div className="flex items-center mb-3">
                          <Building2 className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 truncate" title={bank.name}>
                            {bank.name || "Unnamed Bank"}
                          </h2>
                      </div>

                      {/* Location Details */}
                      <div className="text-sm text-gray-600 space-y-1.5 mb-4">
                        <div className="flex items-start">
                           <MapPin size={15} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                           <span>
                             {bank.location?.address || "N/A"}, {bank.location?.city || "N/A"}, {bank.location?.state || "N/A"} - {bank.location?.pincode || "N/A"}
                           </span>
                        </div>
                        <div className="flex items-center">
                           <Phone size={15} className="mr-2 text-gray-500 flex-shrink-0" />
                           <span>{bank.contact?.phone || "N/A"}</span>
                        </div>
                        {bank.contact?.email && (
                          <div className="flex items-center">
                             <Mail size={15} className="mr-2 text-gray-500 flex-shrink-0" />
                             <span className="truncate" title={bank.contact.email}>{bank.contact.email}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                           <Clock size={15} className="mr-2 text-gray-500 flex-shrink-0" />
                           <span>
                             {bank.operatingHours?.open && bank.operatingHours?.close
                               ? `${bank.operatingHours.open} - ${bank.operatingHours.close}`
                               : "N/A"}
                           </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto pt-4 border-t border-gray-100"> {/* Ensure button is at the bottom */}
                      {isAuthenticated ? ( // Show button only if user is logged in
                        <Link to={`/book-appointment/${bank._id}`} className="block">
                          <motion.button
                            className="w-full flex items-center justify-center bg-red-500 text-white text-sm font-medium px-4 py-2.5 rounded-md shadow-sm hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <CalendarPlus size={16} className="mr-1.5" />
                            Book Appointment
                          </motion.button>
                        </Link>
                      ) : (
                         <p className="text-xs text-center text-gray-500 italic">Login to book an appointment</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Message when no blood banks are found
              <div className="text-center py-16">
                 <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600">No blood banks are currently listed.</p>
                <p className="text-sm text-gray-500 mt-1">Check back later or add a new one if you have the details.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BloodBanks;