import { Routes, Route, useLocation } from "react-router-dom";
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
import BookAppointment from './components/BookAppointment';
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";

function App() {
  const location = useLocation();

  const hideNavbarFooterRoutes = ["/donor-login", "/donor-register", "/admin/login"];
  const shouldShowFooter = !hideNavbarFooterRoutes.includes(location.pathname);

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
        <Route path="/book-appointment/:bloodBankId" element={<BookAppointment />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
