import React, { useState } from "react";
import axios from "axios";
import { API } from "../api/axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await API.post('/contact', formData, {
        withCredentials: true,
      });
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 text-center mb-6">We would love to hear from you!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Your Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name" 
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Phone Number</label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number" 
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Your Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..." 
              className="w-full mt-1 px-3 py-2 border rounded-md h-28 focus:outline-none focus:ring-2 focus:ring-red-500"
              required 
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === "sending"}
            className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-all"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-center">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
