"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FaHandHoldingHeart, FaUsers, FaAward } from "react-icons/fa";
import { GiDrop } from "react-icons/gi";
import { MdOutlineMedicalServices } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import p1 from "../assets/aboutUsImages/1.jpg";
import p2 from "../assets/aboutUsImages/2.jpg";
import p3 from "../assets/aboutUsImages/3.jpg";
import p4 from "../assets/aboutUsImages/4.jpg";
import p5 from "../assets/aboutUsImages/5.jpg";
import p6 from "../assets/aboutUsImages/6.jpg";
import p7 from "../assets/aboutUsImages/7.jpg";

const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const StatItem = ({ icon, value, label, delay }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="text-red-600 text-4xl mb-3">{icon}</div>
      <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-gray-600 text-center">{label}</div>
    </motion.div>
  );
};

const AboutUs = () => {
  const { scrollYProgress } = useScroll();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const navigate = useNavigate();

  const handleBecomeDonorClick = () => {
    navigate("/donor-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        ref={headerRef}
        className="relative w-full h-[60vh] overflow-hidden flex items-center justify-center"
        style={{ opacity, scale }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${p1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4)",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: isHeaderInView ? 1 : 1.1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              About RedLink
            </h1>
            <div className="h-1 w-24 bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              Connecting blood donors with those in need since 2025
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Mission Section */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-red-700 mb-6">
                Our Mission
              </h2>
              <div className="h-1 w-16 bg-red-600 mb-6"></div>
              <p className="text-lg text-gray-700 mb-4">
                At RedLink, our mission is to ensure quick and reliable blood
                donation connections for those in urgent need. We believe that
                no one should suffer due to blood shortages.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                We strive to make blood donation accessible, efficient, and
                lifesaving by creating a seamless platform that connects donors
                with recipients in real-time.
              </p>
              <div className="flex items-center mt-6 bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                <GiDrop className="text-red-600 text-3xl mr-4" />
                <p className="italic text-gray-700">
                  "Every drop counts, every donation matters."
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {[p2, p3, p4, p5].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt="Blood donation"
                    className="rounded-lg shadow-lg h-48 object-cover w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection delay={0.2}>
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-red-700 mb-2">
                Our Impact
              </h2>
              <div className="h-1 w-16 bg-red-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Since our establishment, we've made significant strides in blood
                donation accessibility and awareness.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatItem
                icon={<FaHandHoldingHeart />}
                value="5,200+"
                label="Lives Saved"
                delay={0}
              />
              <StatItem
                icon={<GiDrop />}
                value="12,500+"
                label="Donations Collected"
                delay={0.1}
              />
              <StatItem
                icon={<FaUsers />}
                value="3,800+"
                label="Registered Donors"
                delay={0.2}
              />
              <StatItem
                icon={<MdOutlineMedicalServices />}
                value="150+"
                label="Partner Hospitals"
                delay={0.3}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleBecomeDonorClick}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300"
          >
            Become a Donor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
