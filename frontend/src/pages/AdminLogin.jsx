import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api/axios'; // Ensure this path is correct
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await API.post('/admin-login', { email, password });
      // The backend now sets an HTTP-only cookie, so no need to handle token on the frontend here.
      if (response.status === 200) { 
        navigate('/admin/home'); // Navigate on successful login
      } else {
         throw new Error("Login failed with unexpected status.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      let errorMessage = "Login failed. Please check your credentials or server status.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
         errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Framer Motion Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

   const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

   const formContainerVariants = {
     hidden: { opacity: 0 },
     visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } // Stagger inputs after card animation
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-4">
      <motion.div
        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-red-800" // Added border accent
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
           className="flex flex-col items-center mb-8"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.5 }}
        >
            <ShieldCheck className="h-12 w-12 text-red-600 mb-3" />
            <h2 className="text-3xl font-bold text-center text-gray-800">
                Admin Login
            </h2>
            <p className="text-sm text-gray-500 mt-1">Access the RedLink control panel</p>
        </motion.div>

        <motion.form
            onSubmit={handleLogin}
            className="space-y-6"
            variants={formContainerVariants} // Apply stagger variant to form
            initial="hidden"
            animate="visible"
        >
          {/* Email Input */}
          <motion.div variants={itemVariants} className="relative">
             <label htmlFor="email" className="sr-only">Email</label>
             <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                aria-hidden="true"
             />
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
              disabled={loading}
            />
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                aria-hidden="true"
             />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
              disabled={loading}
            />
          </motion.div>

          {/* Error Message Display */}
          {error && (
            <motion.div
              className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} // Added exit animation possibility if wrapped in AnimatePresence later
            >
              <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
              }`}
               whileHover={{ scale: loading ? 1 : 1.03 }} // Prevent scale on disable
               whileTap={{ scale: loading ? 1 : 0.98 }}    // Prevent scale on disable
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging In...
                </>
              ) : (
                 <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Login
                 </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;