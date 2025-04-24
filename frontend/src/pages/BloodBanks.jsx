import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api/axios";
import { useAuth } from '../context/AuthContext';

const BloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const response = await API.get('/bloodbanks', {
          withCredentials: true,  // Make sure credentials are sent with the request
        });

        setBloodBanks(response.data);
      } catch (error) {
        console.error("Error fetching blood banks:", error);
        setError("Failed to fetch blood banks. Please try again later.");
      }
    };

    fetchBloodBanks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-end">
        <Link to="/add-bloodbank">
          <button className="bg-red-500 rounded-xl p-2 mt-5 mr-4 text-white hover:bg-red-600">
            Add new Blood Bank
          </button>
        </Link>
      </div>

      <div className="p-4">
        <h1 className="text-3xl font-bold text-red-700 mb-6">Blood Banks</h1>
        {error && <p className="text-red-600">{error}</p>}
        {bloodBanks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloodBanks.map((bank) => (
              <div key={bank._id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-red-600">{bank.name}</h2>
                <p className="text-gray-700">
                  {bank.location.address}, {bank.location.city}, {bank.location.state} - {bank.location.pincode}
                </p>
                <p className="text-gray-700">📞 {bank.contact.phone}</p>
                {bank.contact.email && <p className="text-gray-700">✉️ {bank.contact.email}</p>}
                <p className="text-gray-700">
                  ⏰ {bank.operatingHours.open} - {bank.operatingHours.close}
                </p>
                {isAuthenticated && (
                  <Link to={`/book-appointment/${bank._id}`}>
                    <button className="bg-red-600 text-white px-4 py-2 rounded mt-4">
                      Book Appointment
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No blood banks available.</p>
        )}
      </div>
    </div>
  );
};

export default BloodBanks;
