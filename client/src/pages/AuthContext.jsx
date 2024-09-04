import React, { createContext, useState } from "react";

// Create a context
const AuthContext = createContext();

// This component will provide the context
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    userId: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporting both the provider and the context itself
export {AuthContext, AuthProvider};
