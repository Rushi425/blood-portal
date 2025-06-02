import React, { useEffect, useState } from 'react';
import { API } from '../api/axios/';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Building2,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  Tag,
  LogOut
} from 'lucide-react';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersResponse, bloodBanksResponse] = await Promise.all([
          API.get('/admin-users'),
          API.get('/admin-blood-banks')
        ]);

        setUsers(Array.isArray(usersResponse?.data) ? usersResponse.data : []);
        setBloodBanks(Array.isArray(bloodBanksResponse?.data) ? bloodBanksResponse.data : []);

      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch data. Please check your connection or login status.");
        setUsers([]);
        setBloodBanks([]);
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await API.post('/admin-logout');
      navigate('/admin/login');
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
      navigate('/admin/login');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const tableContainerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
      },
    }),
  };

  const tabs = [
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'bloodbanks', label: 'Manage Blood Banks', icon: Building2 },
  ];

  const renderAvailability = (isAvailable) => {
      if (isAvailable === true) {
          return (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle size={14} className="mr-1" />
                  Available
              </span>
          );
      } else if (isAvailable === false) {
          return (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <XCircle size={14} className="mr-1" />
                  Not Available
              </span>
          );
      } else {
           return <span className="text-gray-500 text-xs">N/A</span>;
      }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-gray-50 to-white flex flex-col items-center pt-12 pb-20 px-4">
      <motion.div
        className="w-full max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8 border-t-4 border-red-600"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
             <motion.h1
                className="text-2xl md:text-3xl font-bold text-red-700 mb-2 sm:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Admin Dashboard
            </motion.h1>
             <div className="flex items-center space-x-4">
                <ShieldCheck className="text-red-500 h-8 w-8 hidden sm:block" />
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-colors duration-200"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
             </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading data...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <AlertCircle className="mr-3 h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Tabs and Content - Only render if not loading and no error */}
        {!loading && !error && (
          <>
            {/* Tabs */}
            <div className="mb-8">
              <div className="flex space-x-1 border-b border-gray-200 relative">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'
                    } flex items-center px-4 py-3 font-medium text-sm relative focus:outline-none transition-colors duration-200`}
                  >
                     <tab.icon size={16} className="mr-2" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                        layoutId="underline"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area with Animation */}
            <AnimatePresence mode="wait">
              {/* Users Table */}
              {activeTab === 'users' && (
                <motion.div
                  key="users-table"
                  variants={tableContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-x-auto shadow-md rounded-lg border border-gray-200"
                >
                  <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-red-600 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><Users size={14} className="inline mr-1"/>Name</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><Mail size={14} className="inline mr-1"/>Email</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><Phone size={14} className="inline mr-1"/>Phone</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><Tag size={14} className="inline mr-1"/>Blood Group</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><MapPin size={14} className="inline mr-1"/>City</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><MapPin size={14} className="inline mr-1"/>State</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Availability</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.length > 0 ? users.map((user, index) => (
                        <motion.tr
                           key={user._id}
                           custom={index}
                           variants={rowVariants}
                           initial="hidden"
                           animate="visible"
                           className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{user.fullName || '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{user.email || '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{user.phone || '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{user.bloodGroup || '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{user.city || '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{user.state || '-'}</td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">{renderAvailability(user.availability)}</td>
                        </motion.tr>
                      )) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4 text-gray-500">No users found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {/* Blood Banks Table */}
              {activeTab === 'bloodbanks' && (
                 <motion.div
                  key="bloodbanks-table"
                  variants={tableContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-x-auto shadow-md rounded-lg border border-gray-200"
                >
                  <table className="min-w-full bg-white divide-y divide-gray-200">
                     <thead className="bg-red-600 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><Building2 size={14} className="inline mr-1"/>Name</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><MapPin size={14} className="inline mr-1"/>Address</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><MapPin size={14} className="inline mr-1"/>City</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><MapPin size={14} className="inline mr-1"/>State</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><Tag size={14} className="inline mr-1"/>Pincode</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><Phone size={14} className="inline mr-1"/>Phone</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><Mail size={14} className="inline mr-1"/>Email</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"><Clock size={14} className="inline mr-1"/>Operating Hours</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bloodBanks.length > 0 ? bloodBanks.map((bank, index) => (
                         <motion.tr
                            key={bank._id}
                            custom={index}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{bank.name || '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{bank.location?.address ?? '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{bank.location?.city ?? '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{bank.location?.state ?? '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{bank.location?.pincode ?? '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{bank.contact?.phone ?? '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{bank.contact?.email ?? '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
                            {bank.operatingHours?.open && bank.operatingHours?.close
                              ? `${bank.operatingHours.open} - ${bank.operatingHours.close}`
                              : '-'}
                          </td>
                        </motion.tr>
                      )) : (
                         <tr>
                          <td colSpan="8" className="text-center py-4 text-gray-500">No blood banks found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminHome;