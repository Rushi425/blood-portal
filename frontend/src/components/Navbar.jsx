import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const isAdminPage = location.pathname === "/admin/home";
  const isDonorOrAdminLogin =
    location.pathname === "/donor-login" ||
    location.pathname === "/donor-register" ||
    location.pathname === "/admin/login";

  const navLinks = isDonorOrAdminLogin
    ? [{ to: "/", text: "Home" }]
    : isAdminPage
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

          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>

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
            {!isAuthenticated && !isAdminPage && !isDonorOrAdminLogin && (
              <>
                <li>
                  <Link
                    to="/donor-login"
                    className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-red-800 transition duration-300"
                  >
                    Donor Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-red-800 transition duration-300"
                  >
                    Admin Login
                  </Link>
                </li>
              </>
            )}
            {isAdminPage && (
              <li>
                <button
                  onClick={handleAdminLogout}
                  className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-red-800 transition duration-300"
                >
                  Logout
                </button>
              </li>
            )}
            {isAuthenticated && !isAdminPage && !isDonorOrAdminLogin && (
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
            {!isAuthenticated && !isAdminPage && !isDonorOrAdminLogin && (
              <>
                <li>
                  <Link
                    to="/donor-login"
                    className="block hover:text-yellow-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Donor Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="block hover:text-yellow-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Login
                  </Link>
                </li>
              </>
            )}
            {isAdminPage && (
              <li>
                <button
                  onClick={() => {
                    handleAdminLogout();
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Logout
                </button>
              </li>
            )}
            {isAuthenticated && !isAdminPage && !isDonorOrAdminLogin && (
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
