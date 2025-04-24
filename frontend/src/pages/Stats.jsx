import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/auth/statistics/blood-groups');
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blood Group Statistics</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ group, donors }) => (
          <div key={group} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-red-600">{group}</h3>
            <p className="text-gray-600">Available Donors: {donors}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;