
'use client';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAdminAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'admin_auth_token_prototype';
// This would be securely managed and checked on a server in a real app.
const HARDCODED_ADMIN_PASSWORD_FOR_PROTOTYPE = "admin123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      // In a real app, you'd validate this token with a backend.
      // For this prototype, just checking existence is enough.
      setIsAdminAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    setLoading(true);
    // Simulate an API call for checking password
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
    router.push('/login'); // Redirect to login page on logout
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
