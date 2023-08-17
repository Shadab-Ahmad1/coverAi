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
      setUser(data.email);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  return (
    <AuthContext.Provider value={{ user, isAuthenticated,logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
