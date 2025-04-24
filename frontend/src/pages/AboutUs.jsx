import React from "react";
import { motion } from "framer-motion";
import p1 from "../assets/aboutUsImages/1.jpg";
import p2 from "../assets/aboutUsImages/2.jpg";
import p3 from "../assets/aboutUsImages/3.jpg";
import p4 from "../assets/aboutUsImages/4.jpg";
import p5 from "../assets/aboutUsImages/5.jpg";
import p6 from "../assets/aboutUsImages/6.jpg";
import p7 from "../assets/aboutUsImages/7.jpg";

const images = [p1, p2, p3, p4, p5, p6, p7];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Title */}
      <h1 className="text-5xl font-bold text-red-700 text-center mb-6">About RedLink</h1>

      {/* Image Slider */}
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 15,
            repeat: Infinity,
          }}
          style={{ width: "200%" }} // Ensures smooth looping
        >
          {[...images, ...images].map((src, index) => (
            <img key={index} src={src} alt={`Slide ${index}`} className="w-full h-64 object-cover" />
          ))}
        </motion.div>
      </div>

      {/* Information Section */}
      <div className="mt-10 max-w-2xl text-center space-y-4">
        <p className="text-lg text-gray-700">
          <strong>Established:</strong> 2025
        </p>
        <p className="text-lg text-gray-700">
          <strong>Mission:</strong> To ensure quick and reliable blood donation connections for those in urgent need.
        </p>
        <p className="text-lg text-gray-700">
          <strong>Our Aim:</strong> We strive to make blood donation accessible, efficient, and lifesaving.
        </p>
        <p className="text-lg text-gray-700">
          We collaborate with hospitals, blood banks, and volunteers to simplify the blood donation process and save lives.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
