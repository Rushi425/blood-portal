import React, { createContext, useState, useEffect, useContext } from "react";
import { API } from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derived boolean: is the user authenticated?
  const isAuthenticated = !!user;

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/profile", { withCredentials: true });
        setUser(res.data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await API.post("/login", credentials, { withCredentials: true });
    setUser(res.data.user); // Set user after login
    return res.data.user;
  };

  const logout = async () => {
    await API.post("/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Hook for convenience
export const useAuth = () => useContext(AuthContext);
