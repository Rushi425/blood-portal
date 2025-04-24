import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../api/axios";

const DonorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get('/profile', { withCredentials: true });
      setProfile(response.data);
      setEditedProfile(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load profile");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put('/update-profile', editedProfile, {
        withCredentials: true
      });
      setProfile(response.data);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to update profile");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-500 ease-in-out">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-red-700">My Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}
          {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={editedProfile.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={editedProfile.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    value={editedProfile.state}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={editedProfile.pincode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <p><span className="font-medium">Name:</span> {profile.fullName}</p>
                  <p><span className="font-medium">Email:</span> {profile.email}</p>
                  <p><span className="font-medium">Phone:</span> {profile.phone}</p>
                  <p><span className="font-medium">Gender:</span> {profile.gender}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Blood Donation Details</h2>
                  <p><span className="font-medium">Blood Group:</span> {profile.bloodGroup}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 ${profile.availability ? 'text-green-600' : 'text-red-600'}`}>
                      {profile.availability ? 'Available for donation' : 'Not available'}
                    </span>
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Location</h2>
                  <p><span className="font-medium">City:</span> {profile.city}</p>
                  <p><span className="font-medium">State:</span> {profile.state}</p>
                  <p><span className="font-medium">Pincode:</span> {profile.pincode}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
