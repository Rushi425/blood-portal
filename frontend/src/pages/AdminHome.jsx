import React, { useEffect, useState } from 'react';
import { API } from '../api/axios/';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // users or bloodbanks

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Admin Dashboard</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-full font-semibold ${activeTab === 'users' ? 'bg-red-500 text-white' : 'bg-white border border-red-300 text-red-600'}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('bloodbanks')}
            className={`px-4 py-2 rounded-full font-semibold ${activeTab === 'bloodbanks' ? 'bg-red-500 text-white' : 'bg-white border border-red-300 text-red-600'}`}
          >
            Blood Banks
          </button>
        </div>

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Blood Group</th>
                  <th className="py-3 px-4 text-left">City</th>
                  <th className="py-3 px-4 text-left">State</th>
                  <th className="py-3 px-4 text-left">Availability</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-2 px-4">{user.fullName}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.phone}</td>
                    <td className="py-2 px-4">{user.bloodGroup}</td>
                    <td className="py-2 px-4">{user.city}</td>
                    <td className="py-2 px-4">{user.state}</td>
                    <td className="py-2 px-4">
                      {user.availability ? (
                        <span className="text-green-600 font-semibold">Available</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Not Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Blood Banks Table */}
        {activeTab === 'bloodbanks' && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">City</th>
                  <th className="py-3 px-4 text-left">State</th>
                  <th className="py-3 px-4 text-left">Pincode</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Operating Hours</th>
                </tr>
              </thead>
              <tbody>
                {bloodBanks.map((bank) => (
                  <tr key={bank._id} className="border-b">
                    <td className="py-2 px-4">{bank.name}</td>
                    <td className="py-2 px-4">{bank.location?.address}</td>
                    <td className="py-2 px-4">{bank.location?.city}</td>
                    <td className="py-2 px-4">{bank.location?.state}</td>
                    <td className="py-2 px-4">{bank.location?.pincode}</td>
                    <td className="py-2 px-4">{bank.contact?.phone}</td>
                    <td className="py-2 px-4">{bank.contact?.email}</td>
                    <td className="py-2 px-4">
                      {bank.operatingHours?.open} - {bank.operatingHours?.close}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
