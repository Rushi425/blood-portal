import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, Users, Droplet, Database, CheckCircle } from "lucide-react";
import React from "react";

// Stats Data
const stats = [
  { label: "Lives Saved", value: "5200+", icon: <Heart className="text-red-600" size={30} /> },
  { label: "Total Donations", value: "12500+", icon: <Droplet className="text-red-600" size={30} /> },
  { label: "Active Donors", value: "4200+", icon: <Users className="text-red-600" size={30} /> },
  { label: "Requests Fulfilled", value: "7800+", icon: <Database className="text-red-600" size={30} /> }
];

const Home = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / maxScroll) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center relative">

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-2 bg-gradient-to-r from-red-600 to-red-400 z-50" style={{ width: `${progress}%` }}></div>

      {/* Hero Section */}
      <div className="w-full text-center py-20 bg-red-700 text-white">
        <h1 className="text-5xl font-bold">Welcome to RedLink</h1>
        <p className="text-lg mt-3">Connecting blood donors with seekers efficiently.</p>
        <div className="mt-6 flex space-x-6 justify-center">
          {[ 
            { label: "Become a Donor", link: "/donor-login", bg: "bg-white", text: "text-red-600", hover: "hover:bg-red-100" },
            { label: "Find Blood", link: "/find-blood", bg: "bg-gray-800", text: "text-white", hover: "hover:bg-gray-900" }
          ].map((btn, index) => (
            <div key={index} className="transition-transform transform hover:scale-110">
              <Link to={btn.link} className={`${btn.bg} ${btn.text} font-semibold px-6 py-3 rounded-lg shadow-md ${btn.hover}`}>
                {btn.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="w-full max-w-5xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-3 transition-transform transform hover:scale-105">
            {stat.icon}
            <h2 className="text-2xl font-semibold">{stat.value.toLocaleString()}</h2>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Who Can Donate Section */}
      <div className="w-full max-w-5xl mt-16 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-red-700 text-center mb-6">Who Can Donate?</h2>
        <p className="text-gray-700 text-center mb-6">
          To ensure safety for both donors and recipients, blood donors must meet the following criteria:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[ 
            { title: "Age", description: "18 - 65 years old" },
            { title: "Weight", description: "Minimum 50 kg (110 lbs)" },
            { title: "Health", description: "No chronic illnesses" },
            { title: "Gap Between Donations", description: "Minimum 3 months" },
            { title: "Medical Conditions", description: "Diabetes, controlled hypertension allowed" },
            { title: "Recent Vaccination", description: "Wait 14 days after vaccination" }
          ].map((item, index) => (
            <div key={index} className="bg-red-50 p-4 rounded-lg shadow-md flex items-start space-x-3">
              <CheckCircle className="text-red-600" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-red-700">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
