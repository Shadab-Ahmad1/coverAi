// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuthenticated = () => {
    return !!user;
  };

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:5000/dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Fetched user data:", data); 
      setUser(data.email);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log("User in AuthProvider:", user); 

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
