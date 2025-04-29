// src/components/Footer.jsx
"use client";

import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Twitter, Instagram } from "react-feather";
import { motion } from "framer-motion";

const Footer = () => {
  const iconHover = {
    rest: { scale: 1, color: "#fff" },
    hover: { scale: 1.2, color: "#fcd34d" },
  };

  return (
    <motion.footer
      className="bg-red-700 text-white pt-12 pb-6 shadow-inner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Tagline */}
        <motion.div
          className="flex flex-col items-center md:items-start space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img src={logo} alt="RedLink Logo" className="h-12 md:h-16" />
          <p className="text-gray-200 text-center md:text-left">
            Connecting donors and seekers, one drop at a time.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            {[
              { to: "/", label: "Home" },
              { to: "/about-us", label: "About Us" },
              { to: "/blood-banks", label: "Blood Banks" },
              { to: "/find-blood", label: "Find Blood" },
              { to: "/contact-us", label: "Contact Us" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-yellow-300 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-center space-x-2">
              <Mail size={18} /> 
              <a
                href="mailto:support@redlink.com"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                support@redlink.com
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={18} />
              <a
                href="tel:+18007335465"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                1-800-RED-LINK
              </a>
            </li>
            <li>
              123 Donation Ave<br />
              Mumbai, MH 400001
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className="flex flex-col items-center md:items-start"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                className="text-white"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-red-600 pt-4">
        <p className="text-center text-gray-300 text-sm">
          © {new Date().getFullYear()} RedLink. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
