import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser } from '../api';
import type { AppUser } from '../types/auth';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  configError: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: AppUser["role"]) => Promise<void>;
  logout: () => Promise<void>;
}

const STORAGE_KEY = 'trustaid-user';
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser) as AppUser);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user: loggedInUser } = await loginUser({ email, password });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      setUser(loggedInUser);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: AppUser["role"]
  ) => {
    setLoading(true);
    try {
      const { user: registeredUser } = await registerUser({
        email,
        password,
        fullName: name,
        role,
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredUser));
      setUser(registeredUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, configError: null, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
