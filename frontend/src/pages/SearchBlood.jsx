"use client";

import React, { useState } from "react";
import { API } from "../api/axios.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplet,
  MapPin,
  Search,
  Send,
  Phone,
  MessageSquare,
  Map,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Shield,
  AlertTriangle,
} from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const SearchBlood = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle"); // idle, processing, success, error
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [seekerDetails, setSeekerDetails] = useState({
    phone: "",
    message: "",
    area: "",
  });

  const handleSearch = async () => {
    setError("");
    setResults([]);
    if (!bloodGroup) {
      setError("Please select a blood group");
      return;
    }
    if (!termsAccepted) {
      setError("Please accept the terms and conditions first");
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.get("/search", {
        params: { bloodGroup, location },
        withCredentials: true,
      });
      setResults(data);
    } catch {
      setError("Failed to fetch donors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    setError("");
    setEmailStatus("processing");
    const { phone, message, area } = seekerDetails;
    if (!phone || !message || !area) {
      setError("Please fill in all your details before sending emails.");
      setEmailStatus("idle");
      return;
    }
    if (!results.length) {
      setError("No donors found to send emails to.");
      setEmailStatus("idle");
      return;
    }
    try {
      const { data } = await API.post(
        "/send-emails",
        { seekerDetails, donors: results },
        { withCredentials: true }
      );
      if (data.success) {
        setEmailStatus("success");
        setTimeout(() => setEmailStatus("idle"), 5000);
      } else {
        throw new Error(data.message || "Failed to send emails.");
      }
    } catch (e) {
      setError(e.message || "Failed to send emails. Please try again.");
      setEmailStatus("error");
      setTimeout(() => setEmailStatus("idle"), 5000);
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleSeekerInputChange = (e) => {
    const { name, value } = e.target;
    setSeekerDetails((prev) => ({ ...prev, [name]: value }));
    setError("");
    setEmailStatus("idle");
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            className="text-red-600 mb-6 flex items-center space-x-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle size={18} /> {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Terms and Conditions Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-red-700 mb-4">Terms and Conditions</h2>
              <div className="space-y-4 text-gray-700">
                <p className="font-semibold">Important Health and Safety Terms:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>I understand that blood donation is a voluntary act and donors are not obligated to respond to requests.</li>
                  <li>I confirm that the blood requirement is genuine and for medical purposes only.</li>
                  <li>I will not misuse donor contact information or share it with unauthorized parties.</li>
                  <li>I understand that donors may not be available immediately and may need time to respond.</li>
                  <li>I will respect donor privacy and maintain confidentiality of all communications.</li>
                  <li>I will not use this service for commercial purposes or blood trading.</li>
                  <li>I understand that this platform is for emergency blood requirements only.</li>
                </ul>
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                    I have read and agree to these terms and conditions
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (termsAccepted) {
                      setShowTerms(false);
                    }
                  }}
                  disabled={!termsAccepted}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  Accept & Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seeker & Search Form */}
      <motion.div
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 border-t-4 border-red-600"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Seeker Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Your Details</h3>
          <div>
            <label className="block mb-1">Your Phone</label>
            <div className="flex items-center border rounded-lg">
              <Phone className="text-gray-400 ml-3" />
              <input
                type="text"
                name="phone"
                value={seekerDetails.phone}
                onChange={handleSeekerInputChange}
                className="w-full p-3 outline-none"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Your Area</label>
            <div className="flex items-center border rounded-lg">
              <Map className="text-gray-400 ml-3" />
              <input
                type="text"
                name="area"
                value={seekerDetails.area}
                onChange={handleSeekerInputChange}
                className="w-full p-3 outline-none"
                placeholder="Hospital or locality"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Message for Donors</label>
            <div className="flex items-start border rounded-lg">
              <MessageSquare className="text-gray-400 ml-3 mt-3" />
              <textarea
                name="message"
                value={seekerDetails.message}
                onChange={handleSeekerInputChange}
                className="w-full p-3 outline-none h-32"
                placeholder="E.g., urgent need in XYZ hospital"
              />
            </div>
          </div>
        </div>

        {/* Search Inputs */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Search Donors</h3>
          <div>
            <label className="block mb-1">Select Blood Group</label>
            <div className="flex items-center border rounded-lg relative">
              <Droplet className="text-gray-400 ml-3" />
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full p-3 outline-none appearance-none"
              >
                <option value="">-- Choose --</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 pointer-events-none">▼</div>
            </div>
          </div>
          <div>
            <label className="block mb-1">Enter Location</label>
            <div className="flex items-center border rounded-lg">
              <MapPin className="text-gray-400 ml-3" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 outline-none"
                placeholder="City (e.g., Pune)"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="termsCheckbox" className="text-sm text-gray-700">
              I accept the{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-red-600 hover:text-red-700 underline"
              >
                terms and conditions
              </button>
            </label>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !termsAccepted}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin inline-block mr-2" size={20} />
                Searching...
              </>
            ) : (
              <>
                <Search className="inline-block mr-2" size={20} />
                Search
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Results & Send Email */}
      <motion.div
        className="w-full max-w-3xl mt-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold text-red-700 text-center mb-6">
          Search Results
        </h2>
        <AnimatePresence>
          {results.length > 0 ? (
            <motion.div
              key="results"
              className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-red-600 overflow-x-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <button
                onClick={handleSendEmail}
                disabled={
                  emailStatus !== "idle" ||
                  !seekerDetails.phone ||
                  !seekerDetails.message ||
                  !seekerDetails.area
                }
                className={
                  "w-full mb-4 py-3 rounded-lg text-white font-semibold transition disabled:opacity-50 " +
                  (emailStatus === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : emailStatus === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700")
                }
              >
                {emailStatus === "idle" && (
                  <>
                    <Send className="inline-block mr-2" size={20} />
                    Send Email to All Donors
                  </>
                )}
                {emailStatus === "processing" && (
                  <>
                    <Loader2 className="animate-spin inline-block mr-2" size={20} />
                    Sending...
                  </>
                )}
                {emailStatus === "success" && (
                  <>
                    <CheckCircle2 className="inline-block mr-2" size={20} />
                    Emails sent successfully
                  </>
                )}
                {emailStatus === "error" && (
                  <>
                    <AlertCircle className="inline-block mr-2" size={20} />
                    Failed to send emails
                  </>
                )}
              </button>

              <table className="min-w-full">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Blood Group</th>
                    <th className="py-2 px-4">City</th>
                    <th className="py-2 px-4">Phone</th>
                    <th className="py-2 px-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((donor, i) => (
                    <tr key={donor._id || i} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{donor.fullName}</td>
                      <td className="py-2 px-4 text-red-600">{donor.bloodGroup}</td>
                      <td className="py-2 px-4">{donor.city}</td>
                      <td className="py-2 px-4">
                        <a
                          className="text-blue-600 hover:underline"
                          href={`tel:${donor.phone}`}
                        >
                          {donor.phone}
                        </a>
                      </td>
                      <td className="py-2 px-4">{donor.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.p className="text-center text-gray-600">
              {loading
                ? "Searching for donors..."
                : "No donors found. Please search above."}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SearchBlood;
