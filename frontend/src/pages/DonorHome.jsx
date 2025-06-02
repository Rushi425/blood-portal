"use client";

import React, { useState, useEffect } from "react";
import { API } from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building as city,
  Globe,
  KeyRound,
  Edit,
  Save,
  XCircle,
  Droplet,
  HeartPulse,
  CheckCircle2,
  CircleDotDashed,
  Loader2,
} from "lucide-react";

const DonorHome = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (isEditing && profile) {
      setEditedProfile({ ...profile });
    }
  }, [isEditing, profile]);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await API.get("/profile", { withCredentials: true });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccessMessage("");

    if (!editedProfile?.phone || !editedProfile?.city || !editedProfile?.state || !editedProfile?.pincode) {
      setError("Please fill in all required fields.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await API.put("/update-profile", editedProfile, {
        withCredentials: true,
      });
      setProfile(response.data);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAvailability = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const response = await API.put("/toggle-availability", {}, { withCredentials: true });
      setProfile((prev) => ({ ...prev, availability: response.data.availability }));
      setSuccessMessage(`Availability updated to: ${response.data.availability ? "Available" : "Not Available"}`);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error updating availability:", error);
      setError("Failed to update availability.");
      setTimeout(() => setError(""), 5000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-700 text-xl">
        <Loader2 className="animate-spin mr-3" size={24} />
        Loading Profile...
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-red-600 text-xl p-4 text-center">
        <XCircle className="mb-3" size={40} />
        <p>{error}</p>
        <button
          onClick={fetchProfile}
          className="mt-6 bg-red-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Loader2 className={`${loading ? "animate-spin" : ""}`} size={20} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-10 px-4 relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(239,68,68,0.1)_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <motion.div className="max-w-4xl mx-auto relative z-10" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <div className="bg-white rounded-xl shadow-2xl p-8 border-t-4 border-red-600">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <motion.h1 className="text-3xl font-bold text-red-700 mb-2 sm:mb-0" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              My Dashboard
            </motion.h1>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {isEditing ? (<><XCircle size={20} /> Cancel</>) : (<><Edit size={20} /> Edit Profile</>)}
            </motion.button>
          </div>
          <div className="h-1 w-20 bg-red-600 mb-8"></div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p key="error-msg" className="text-red-600 mb-4 flex items-center space-x-2 font-medium" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <XCircle size={20} /> <span>{error}</span>
              </motion.p>
            )}
            {successMessage && (
              <motion.p key="success-msg" className="text-green-600 mb-4 flex items-center space-x-2 font-medium" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <CheckCircle2 size={20} /> <span>{successMessage}</span>
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.form key="editForm" onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="text" name="phone" value={editedProfile?.phone || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" name="city" value={editedProfile?.city || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input type="text" name="state" value={editedProfile?.state || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input type="text" name="pincode" value={editedProfile?.pincode || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" disabled={isSaving} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </motion.form>
            ) : profile && (
              <motion.div key="profileView" className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }}>
                <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="space-y-4">
                  <h2 className="text-xl font-semibold text-red-700 mb-2 flex items-center space-x-2">
                    <User size={24} /> <span>Personal Information</span>
                  </h2>
                  <p className="flex items-center space-x-2"><span className="font-medium w-24">Name:</span> <span>{profile.fullName}</span></p>
                  <p className="flex items-center space-x-2"><span className="font-medium w-24">Email:</span> <span>{profile.email}</span></p>
                  <p className="flex items-center space-x-2"><span className="font-medium w-24">Phone:</span> <span>{profile.phone}</span></p>
                  <p className="flex items-center space-x-2"><span className="font-medium w-24">Gender:</span> <span>{profile.gender}</span></p>
                </motion.div>
                <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
                  <h2 className="text-xl font-semibold text-red-700 mb-2 flex items-center space-x-2">
                    <MapPin size={24} /> <span>Location</span>
                  </h2>
                  <p className="flex items-center space-x-2"><span className="font-medium w-24">City:</span> <span>{profile.city}</span></p>
                  <p className="flex items-center space-x-2"><span className="font-medium w-24">State:</span> <span>{profile.state}</span></p>
                  <p className="flex items-center space-x-2"><span className="font-medium w-24">Pincode:</span> <span>{profile.pincode}</span></p>
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
                  
                  <div className="flex items-center space-x-3">
                    <HeartPulse className="text-red-600" />
                    <span className="text-lg font-semibold">
                      Availability:{" "}
                      <span className={profile.availability ? "text-green-600" : "text-red-600"}>
                        {profile.availability ? "Available" : "Not Available"}
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={toggleAvailability}
                    className={`px-5 py-2 rounded-md font-semibold transition-colors duration-200 ${
                      profile.availability
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {profile.availability ? "Set as Unavailable" : "Set as Available"}
                  </button>
                </div>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DonorHome;
