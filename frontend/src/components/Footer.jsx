import React from "react";
import logo from "../assets/logo.png";  
import { Mail, Phone, Facebook, Twitter, Instagram } from "react-feather"; // Importing icons from react-feather
const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        {/* Left Side - Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="RedLink Logo" className="ml-5 h-15 w-40" />
        </div>





        {/* Center - Copyright */}
        <div className="text-center">
          <p>© 2025 RedLink | All Rights Reserved</p>
        </div>

        {/* Right Side - Social Media & Contact */}
        <div className="flex space-x-5">
          <a href="mailto:support@redlink.com" target="_blank" rel="noopener noreferrer">
            <Mail size={24} className="hover:text-gray-300 transition-all duration-300" />
          </a>
          <a href="tel:+1234567890">
            <Phone size={24} className="hover:text-gray-300 transition-all duration-300" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={24} className="hover:text-gray-300 transition-all duration-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter size={24} className="hover:text-gray-300 transition-all duration-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={24} className="hover:text-gray-300 transition-all duration-300" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
