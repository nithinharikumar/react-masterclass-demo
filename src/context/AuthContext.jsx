import React, { createContext, useContext, useState } from 'react';

// Authentication Context demonstrating global state for Conditional Rendering & Routing guards
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null when logged out, { name, role, email } when logged in

  const login = (name = 'Alex Rivera', role = 'Student') => {
    setUser({
      id: 'USR-8042',
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@academy.dev`,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
