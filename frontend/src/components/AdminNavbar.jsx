import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav>
      <Link to="/admin-home">Home</Link>
      <button onClick={() => localStorage.removeItem('adminToken')}>Logout</button>
    </nav>
  );
};

export default AdminNavbar;