
'use client';
// ReactNode type import removed
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// AuthContextType interface removed

const AuthContext = createContext(undefined); // AuthContextType | undefined removed

const AUTH_TOKEN_KEY = 'admin_auth_token_prototype';
const HARDCODED_ADMIN_PASSWORD_FOR_PROTOTYPE = "admin123";

export function AuthProvider({ children }) { // Type { children: ReactNode } removed
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setIsAdminAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (password) => { // Type (password: string): Promise<boolean> removed
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === HARDCODED_ADMIN_PASSWORD_FOR_PROTOTYPE) {
      localStorage.setItem(AUTH_TOKEN_KEY, 'dummy_prototype_token_value');
      setIsAdminAuthenticated(true);
      setLoading(false);
      return true;
    }
    setIsAdminAuthenticated(false);
    setLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAdminAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
