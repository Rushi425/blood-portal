import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = isAuthenticated ? [
    { to: "/donor-home", text: "Dashboard" },
    { to: "/blood-banks", text: "Blood Banks" },
    { to: "/find-blood", text: "Find Blood" },
    { to: "/about-us", text: "About Us" },
    { to: "/contact-us", text: "Contact Us" },
  ] : [
    { to: "/", text: "Home" },
    { to: "/blood-banks", text: "Blood Banks" },
    { to: "/find-blood", text: "Find Blood" },
    { to: "/about-us", text: "About Us" },
    { to: "/contact-us", text: "Contact Us" },
    { to: "/donor-login", text: "Login" },
  ];

  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to={isAuthenticated ? "/donor-home" : "/"}
            className="text-3xl font-bold tracking-wide"
          >
            Red<span className="text-yellow-300">Link</span>
          </Link>

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="hover:text-yellow-300 transition duration-300"
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-red-800 transition duration-300"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="md:hidden space-y-4 pb-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="block hover:text-yellow-300 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
  