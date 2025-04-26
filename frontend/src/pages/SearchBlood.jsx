import React, { useState } from "react";
import { API } from "../api/axios.js";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const SearchBlood = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle"); // new state for email button
  const [seekerDetails, setSeekerDetails] = useState({
    phone: "",
    message: "",
    area: "",
  });

  const handleSearch = async () => {
    if (!bloodGroup) {
      setError("Please select a blood group");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await API.get("/search", {
        params: { bloodGroup, location },
        withCredentials: true,
      });
      setResults(response.data);
    } catch (error) {
      setError("Failed to fetch donors. Please try again.");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!seekerDetails.phone || !seekerDetails.message || !seekerDetails.area) {
      setError("Please fill in all seeker details");
      return;
    }

    setEmailStatus("processing");

    try {
      await API.post("/send-email", {
        seekerDetails,
        donors: results,
      });
      setEmailStatus("success");
    } catch (error) {
      setEmailStatus("idle"); // reset back
      setError("Failed to send emails. Please try again.");
      console.error("Email sending error:", error);
    }
  };

  const handleSeekerInputChange = (e) => {
    const { name, value } = e.target;
    setSeekerDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Find a Blood Donor</h1>
      
      {/* Search Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
        {/* ... [search form remains same] */}
        
        <label className="text-gray-700 font-semibold mb-2">Your Phone</label>
        <input
          type="text"
          name="phone"
          value={seekerDetails.phone}
          onChange={handleSeekerInputChange}
          className="w-full p-2 border rounded focus:outline-none"
          placeholder="Enter your phone number"
        />
        <label className="text-gray-700 font-semibold mt-4 mb-2">Your Message</label>
        <textarea
          name="message"
          value={seekerDetails.message}
          onChange={handleSeekerInputChange}
          className="w-full p-2 border rounded focus:outline-none"
          placeholder="Enter your message"
        ></textarea>
        <label className="text-gray-700 font-semibold mt-4 mb-2">Your Area</label>
        <input
          type="text"
          name="area"
          value={seekerDetails.area}
          onChange={handleSeekerInputChange}
          className="w-full p-2 border rounded focus:outline-none"
          placeholder="Enter your area"
        />
        <label className="text-gray-700 font-semibold mt-4 mb-2">Select Blood Group</label>
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        >
          <option value="">-- Choose --</option>
          {bloodGroups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
        <label className="text-gray-700 font-semibold mt-4 mb-2">Enter Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          placeholder="City"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-red-600 text-white p-2 mt-4 rounded hover:bg-red-700 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* Results */}
      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Results</h2>

        {results.length > 0 ? (
          <div className="overflow-x-auto">
            {/* Send Email Button on Top */}
            <button
              onClick={handleSendEmail}
              disabled={emailStatus === "processing"}
              className={`w-full ${
                emailStatus === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white p-2 mb-4 rounded transition`}
            >
              {emailStatus === "idle"
                ? "Send Email to All Donors"
                : emailStatus === "processing"
                ? "Processing..."
                : "Emails Sent Successfully!"}
            </button>

            <table className="min-w-full bg-white rounded-lg shadow-md">
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
                {results.map((donor, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-4 text-center font-semibold text-gray-700">{donor.fullName}</td>
                    <td className="py-2 px-4 text-center text-red-600">{donor.bloodGroup}</td>
                    <td className="py-2 px-4 text-center">{donor.city}</td>
                    <td className="py-2 px-4 text-center">
                      <a href={`tel:${donor.phone}`} className="text-blue-600 hover:underline">
                        {donor.phone}
                      </a>
                    </td>
                    <td className="py-2 px-4 text-center">{donor.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center">{loading ? "Loading..." : "No donors found."}</p>
        )}
      </div>
    </div>
  );
};

export default SearchBlood;
