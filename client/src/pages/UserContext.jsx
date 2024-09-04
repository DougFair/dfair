import React, { createContext, useState } from "react";

// Create a context
const UserContext = createContext();

// This component will provide the context
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({user: null});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Exporting both the provider and the context itself
export {UserContext, UserProvider};
