// Navbar.jsx

"use client";

import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  Shield,
  Home,
  Droplet
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
    setIsOpen(false);
  };

  const isAdminPage = location.pathname.startsWith("/admin");
  const isAuthPage =
    location.pathname === "/donor-login" ||
    location.pathname === "/donor-register" ||
    location.pathname === "/admin/login";

  const navLinks = isAuthPage
    ? [{ to: "/", text: "Home", icon: <Home size={20} /> }]
    : isAdminPage && location.pathname !== "/admin/login"
    ? []
    : isAuthenticated
    ? [
        { to: "/donor-home", text: "Dashboard" },
        { to: "/blood-banks", text: "Blood Banks" },
        { to: "/find-blood", text: "Find Blood" },
        { to: "/about-us", text: "About Us" },
        { to: "/contact-us", text: "Contact Us" },
      ]
    : [
        { to: "/", text: "Home" },
        { to: "/blood-banks", text: "Blood Banks" },
        { to: "/find-blood", text: "Find Blood" },
        { to: "/about-us", text: "About Us" },
        { to: "/contact-us", text: "Contact Us" },
      ];

  const isActiveLink = (to) => {
    if (to === "/" && location.pathname === "/") return true;
    if (to !== "/" && location.pathname.startsWith(to)) return true;
    return false;
  };

  return (
    <motion.nav
      className="bg-red-700 text-white shadow-xl sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to={isAuthenticated ? "/donor-home" : "/"}
              className="text-3xl font-bold tracking-wide flex items-center space-x-1"
            >
              <span>Red</span>
              <span className="text-yellow-300">Link</span>
              <Droplet size={28} className="text-yellow-300 rotate-[-10deg]" />
            </Link>
          </motion.div>

          <button
            className="md:hidden text-white text-2xl focus:outline-none p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? "open" : "closed"}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
                exit={{ rotate: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center text-lg">
            <AnimatePresence>
              {navLinks.map((link) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.to}
                    className={`hover:text-yellow-300 transition duration-300 ${
                      isActiveLink(link.to)
                        ? "text-yellow-300 font-semibold"
                        : ""
                    }`}
                  >
                    {link.text}
                  </Link>
                </motion.li>
              ))}

              {!isAuthenticated && !isAdminPage && !isAuthPage && (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Link
                      to="/donor-login"
                      className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition duration-300 flex items-center space-x-1"
                    >
                      <LogIn size={20} />
                      <span>Donor Login</span>
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Link
                      to="/admin/login"
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition duration-300 flex items-center space-x-1"
                    >
                      <Shield size={20} />
                      <span>Admin Login</span>
                    </Link>
                  </motion.li>
                </>
              )}

              {isAdminPage && location.pathname !== "/admin/login" && (
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={handleAdminLogout}
                    className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition duration-300 flex items-center space-x-1"
                  >
                    <LogOut size={20} />
                    <span>Admin Logout</span>
                  </button>
                </motion.li>
              )}

              {isAuthenticated && !isAdminPage && !isAuthPage && (
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={handleLogout}
                    className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition duration-300 flex items-center space-x-1"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="md:hidden space-y-4 pb-4 border-t border-red-600 mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`block hover:text-yellow-300 transition duration-300 py-2 ${
                      isActiveLink(link.to) ? "text-yellow-300 font-semibold" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>
                </motion.li>
              ))}

              {!isAuthenticated && !isAdminPage && !isAuthPage && (
                <>
                  <li>
                    <Link
                      to="/donor-login"
                      className="block text-white bg-white bg-opacity-20 px-4 py-2 rounded hover:bg-opacity-30"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogIn size={18} className="inline mr-1" /> Donor Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/login"
                      className="block text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield size={18} className="inline mr-1" /> Admin Login
                    </Link>
                  </li>
                </>
              )}

              {isAdminPage && location.pathname !== "/admin/login" && (
                <li>
                  <button
                    onClick={handleAdminLogout}
                    className="w-full text-left text-white bg-white bg-opacity-20 px-4 py-2 rounded hover:bg-opacity-30"
                  >
                    <LogOut size={18} className="inline mr-1" /> Admin Logout
                  </button>
                </li>
              )}

              {isAuthenticated && !isAdminPage && !isAuthPage && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-white bg-white bg-opacity-20 px-4 py-2 rounded hover:bg-opacity-30"
                  >
                    <LogOut size={18} className="inline mr-1" /> Logout
                  </button>
                </li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
