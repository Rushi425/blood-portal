import React, { useState } from "react";
import axios from "axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const SearchBlood = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!bloodGroup) {
      setError("Please select a blood group");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `/api/donor/search?bloodGroup=${bloodGroup}&location=${location}`,
        { withCredentials: true }
      );
      setResults(response.data);
    } catch (error) {
      setError("Failed to fetch donors. Please try again.");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Find a Blood Donor</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
        <label className="text-gray-700 font-semibold mb-2">Select Blood Group</label>
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
          placeholder="City or area"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-red-600 text-white p-2 mt-4 rounded hover:bg-red-700 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Results</h2>
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((donor, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-red-600">{donor.name}</h3>
                  <p className="text-gray-700">{donor.bloodGroup} - {donor.city}</p>
                  <p className="text-sm text-gray-500">📞 {donor.contact}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">{loading ? "Loading..." : "No donors found."}</p>
        )}
      </div>
    </div>
  );
};

export default SearchBlood;