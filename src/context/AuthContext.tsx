import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database stored in localStorage
const MOCK_USERS_KEY = 'ecommerce_users';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const getMockUsers = (): User[] => {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveMockUsers = (users: User[]) => {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  };

  const generateToken = () => {
    return 'mock_token_' + Date.now();
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const users = getMockUsers();
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      setLoading(false);
      throw new Error('Email already exists');
    }
    const newUser: User = { id: Date.now(), email, name };
    saveMockUsers([...users, newUser]);
    const newToken = generateToken();
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const users = getMockUsers();
    const existingUser = users.find(u => u.email === email);
    if (!existingUser) {
      setLoading(false);
      throw new Error('User not found');
    }
    const newToken = generateToken();
    setToken(newToken);
    setUser(existingUser);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('user', JSON.stringify(existingUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
