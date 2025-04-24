import { Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DonorHome from "./pages/DonorHome";
import DonorProfile from "./pages/DonorProfile";
import DonorLogin from "./pages/DonorLogin";
import DonorRegister from "./pages/DonorRegister";
import BloodBanks from "./pages/BloodBanks";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SearchBlood from "./pages/SearchBlood";
import AddBloodBank from "./pages/AddBloodBank";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/donor-profile" element={<DonorProfile />} />
        <Route path="/donor-home" element={<DonorHome />} />
        <Route path="/blood-banks" element={<BloodBanks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/find-blood" element={<SearchBlood />} />
        <Route path="/add-bloodbank" element={<AddBloodBank />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
