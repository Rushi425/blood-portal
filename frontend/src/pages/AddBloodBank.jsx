import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../api/axios";

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
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      const response = await API.post("/bloodbank", formData, {
        withCredentials: true,
      });
  
      if (response.status === 201) {
        setSuccess("Blood Bank added successfully!");
        setFormData({
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
        setTimeout(() => {
          navigate("/blood-banks");
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding blood bank:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to add blood bank. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Add New Blood Bank</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <label className="block text-gray-700 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Blood Bank Name"
          className="w-full p-2 border rounded mt-1 mb-3"
          required
        />
        <label className="block text-gray-700 font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Street / Area"
          className="w-full p-2 border rounded mt-1 mb-3"
          required
        />
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 mb-3"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 mb-3"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Pincode</label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 mb-3"
              required
              min="100000"
              max="999999"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 mb-3"
              required
            />
          </div>
        </div>
        <label className="block text-gray-700 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="addbank@gmail.com"
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 mb-3"
        />
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Opens at</label>
            <input
              type="time"
              name="open"
              value={formData.open}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 mb-3"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Closes at</label>
            <input
              type="time"
              name="close"
              value={formData.close}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 mb-3"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-red-600 text-white p-2 mt-2 rounded hover:bg-red-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Adding...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddBloodBank;
