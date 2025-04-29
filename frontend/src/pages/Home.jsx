"use client"

import { useRef } from "react"
import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Heart, Users, Droplet, Database, CheckCircle, ArrowDown } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FaHandHoldingMedical, FaHeartbeat, FaHospital } from "react-icons/fa"
import { GiDrop , GiHealthNormal } from "react-icons/gi"

// Stats Data with enhanced icons
const stats = [
  {
    label: "Lives Saved",
    value: "5200+",
    icon: <Heart className="text-red-600" size={30} />,
    description: "Blood donations that directly saved lives",
  },
  {
    label: "Total Donations",
    value: "12500+",
    icon: <Droplet className="text-red-600" size={30} />,
    description: "Units of blood collected from our generous donors",
  },
  {
    label: "Active Donors",
    value: "4200+",
    icon: <Users className="text-red-600" size={30} />,
    description: "Regular donors in our community",
  },
  {
    label: "Requests Fulfilled",
    value: "7800+",
    icon: <Database className="text-red-600" size={30} />,
    description: "Emergency blood requests successfully fulfilled",
  },
]

const Home = () => {
  const [progress, setProgress] = useState(0)
  const { scrollYProgress } = useScroll()
  const statsRef = useRef(null)
  const criteriaRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollY / maxScroll) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const statsOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0.5, 1])
  const criteriaOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 0.5, 1])
  

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Blood Drop Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-10 bg-red-600 rounded-t-full rounded-b-full transform rotate-45 opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-2 bg-gradient-to-r from-red-700 via-red-500 to-red-400 z-50"
        style={{ width: `${progress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Hero Section */}
      <motion.div
        className="w-full text-center py-24 bg-gradient-to-b from-red-800 to-red-600 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:20px_20px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl font-bold mb-2 tracking-tight">RedLink</h1>
            <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
            <p className="text-xl mt-3 max-w-2xl mx-auto font-light">
              Connecting blood donors with seekers efficiently. Every drop counts, every donation matters.
            </p>
          </motion.div>

          {/* Animated Blood Drop */}
          <motion.div
            className="my-10 relative h-32 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="w-20 h-32 bg-red-500 rounded-t-full rounded-b-full mx-auto relative overflow-hidden"
              animate={{
                scale: [1, 1.05, 1],
                backgroundColor: ["#ef4444", "#dc2626", "#ef4444"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-red-400 opacity-50"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap gap-6 justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              {
                label: "Become a Donor",
                link: "/donor-login",
                bg: "bg-white",
                text: "text-red-600",
                hover: "hover:bg-red-50",
                icon: <FaHandHoldingMedical className="mr-2" />,
              },
              {
                label: "Find Blood",
                link: "/find-blood",
                bg: "bg-gray-800",
                text: "text-white",
                hover: "hover:bg-gray-900",
                icon: <GiDrop  className="mr-2" />,
              },
            ].map((btn, index) => (
              <motion.div
                key={index}
                className="transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={btn.link}
                  className={`${btn.bg} ${btn.text} font-semibold px-8 py-4 rounded-lg shadow-lg ${btn.hover} flex items-center`}
                >
                  {btn.icon}
                  {btn.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              delay: 1.5,
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <ArrowDown size={24} />
          </motion.div>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div ref={statsRef} className="w-full max-w-6xl mt-16 px-4" style={{ opacity: statsOpacity }}>
        <motion.h2
          className="text-3xl font-bold text-red-700 text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Impact
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center space-y-4 border-t-4 border-red-600 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full"></div>
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: index * 0.1 + 0.2,
                }}
                viewport={{ once: true }}
              >
                {stat.icon}
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800">{stat.value}</h2>
              <p className="text-gray-600 font-medium">{stat.label}</p>
              <p className="text-sm text-gray-500 text-center">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

{/* Information Section */}
      <section className="w-full max-w-6xl mt-20 px-4">
        <motion.div
          className="bg-white shadow-xl rounded-xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-red-700 text-center mb-6">How RedLink Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 text-center">
            <div className="p-4">
              <GiHealthNormal size={40} className="text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-2">Register as Donor</h3>
              <p>Sign up and become a part of our life-saving donor community.</p>
            </div>
            <div className="p-4">
              <FaHospital size={40} className="text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-2">Search for Blood</h3>
              <p>Find donors or blood banks by group and location instantly.</p>
            </div>
            <div className="p-4">
              <FaHeartbeat size={40} className="text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-2">Save Lives</h3>
              <p>Get matched with a donor or recipient and make a real difference.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Reviews Section */}
        <section className="w-full max-w-6xl mt-20 px-4">
          <motion.div
            className="bg-white shadow-xl rounded-xl p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-red-700 text-center mb-8">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
              {[
                {
                  name: "Priya Sharma",
                  text: "I was able to find a donor in just 10 minutes. RedLink truly saved my brother’s life.",
                },
                {
                  name: "Ravi Mehta",
                  text: "I feel proud to be a regular donor on RedLink. It’s quick, easy, and impactful!",
                },
                {
                  name: "Aisha Khan",
                  text: "Amazing initiative! The UI is friendly and the platform is a blessing during emergencies.",
                },
              ].map((review, index) => (
                <motion.div
                  key={index}
                  className="p-6 border rounded-xl shadow-md bg-gray-50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="italic text-gray-600 mb-4">“{review.text}”</p>
                  <p className="font-semibold text-red-700">- {review.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>


      {/* Who Can Donate Section */}
      <motion.div ref={criteriaRef} className="w-full max-w-6xl mt-20 mb-20 px-4" style={{ opacity: criteriaOpacity }}>
        <motion.div
          className="bg-white shadow-xl rounded-xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-bl-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-50 rounded-tr-full -z-10"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-red-700 text-center mb-2">Who Can Donate?</h2>
            <div className="h-1 w-24 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-700 text-center mb-10 max-w-3xl mx-auto">
              To ensure safety for both donors and recipients, blood donors must meet the following criteria:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Age",
                description: "18 - 65 years old",
                icon: <FaHeartbeat className="text-red-600" size={24} />,
              },
              {
                title: "Weight",
                description: "Minimum 50 kg (110 lbs)",
                icon: <CheckCircle className="text-red-600" size={24} />,
              },
              {
                title: "Health",
                description: "No chronic illnesses",
                icon: <GiHealthNormal className="text-red-600" size={24} />,
              },
              {
                title: "Gap Between Donations",
                description: "Minimum 3 months",
                icon: <Droplet className="text-red-600" size={24} />,
              },
              {
                title: "Medical Conditions",
                description: "Diabetes, controlled hypertension allowed",
                icon: <FaHospital className="text-red-600" size={24} />,
              },
              {
                title: "Recent Vaccination",
                description: "Wait 14 days after vaccination",
                icon: <CheckCircle className="text-red-600" size={24} />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-red-50 to-white p-6 rounded-lg shadow-md flex items-start space-x-4 border border-red-100"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="bg-white p-3 rounded-full shadow-sm">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-red-700">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/donor-login"
              className="inline-flex items-center bg-red-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-red-700 transition-all"
            >
              <FaHandHoldingMedical className="mr-2" />
              Become a Donor Today
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home
