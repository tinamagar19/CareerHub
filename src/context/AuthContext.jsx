import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('careerhub_users', []);
  const [currentUser, setCurrentUser] = useLocalStorage('careerhub_current_user', null);
  const { showToast } = useToast();

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      showToast('Logged in successfully', 'success');
      return true;
    }
    showToast('Invalid email or password', 'error');
    return false;
  };

  const register = (userData) => {
    const exists = users.find(u => u.email === userData.email);
    if (exists) {
      showToast('Email already in use', 'error');
      return false;
    }
    setUsers([...users, userData]);
    setCurrentUser(userData);
    showToast('Registered successfully', 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out', 'success');
  };

  const updateProfile = (updatedData) => {
    const updatedUsers = users.map(u => u.email === currentUser.email ? { ...u, ...updatedData } : u);
    setUsers(updatedUsers);
    setCurrentUser({ ...currentUser, ...updatedData });
    showToast('Profile updated', 'success');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
