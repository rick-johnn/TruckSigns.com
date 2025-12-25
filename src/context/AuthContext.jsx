import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  setCurrentUser,
  logout as logoutStorage,
  saveUser,
  validateCredentials,
  findUserByEmail,
} from '../utils/storage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const validUser = validateCredentials(email, password);
    if (validUser) {
      setCurrentUser(validUser);
      setUser({
        email: validUser.email,
        name: validUser.name,
        companyName: validUser.companyName,
        contactName: validUser.contactName,
        phone: validUser.phone,
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (userData) => {
    const { email, password, name, companyName, contactName, phone } = userData;

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' };
    }

    // Create new user
    const newUser = {
      email,
      password,
      name,
      companyName,
      contactName,
      phone,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);
    setCurrentUser(newUser);
    setUser({
      email: newUser.email,
      name: newUser.name,
      companyName: newUser.companyName,
      contactName: newUser.contactName,
      phone: newUser.phone,
    });

    return { success: true };
  };

  const logout = () => {
    logoutStorage();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
