import React, { useEffect, useState } from 'react';
import { API } from '../api/axios/';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const usersResponse = await API.get('/admin-users', config);
      const bloodBanksResponse = await API.get('/admin-blood-banks', config);

      setUsers(usersResponse.data);
      setBloodBanks(bloodBanksResponse.data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Admin Dashboard</h2>

        {/* Registered Users Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Registered Users</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md rounded-xl p-4 border border-red-100"
              >
                <p className="text-lg font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Banks Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Registered Blood Banks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bloodBanks.map((bank) => (
              <div
                key={bank._id}
                className="bg-white shadow-md rounded-xl p-4 border border-red-100"
              >
                <p className="text-lg font-medium text-gray-800">{bank.name}</p>
                <p className="text-sm text-gray-600">
                  {bank.location?.address}, {bank.location?.city}, {bank.location?.state} - {bank.location?.pincode}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
