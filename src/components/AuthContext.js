import React, { createContext, useState, useContext } from 'react';

// Create a Context for Authentication
const AuthContext = createContext();

// Create a provider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const login = (username) => {
    localStorage.setItem('username', username);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem('username');
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
