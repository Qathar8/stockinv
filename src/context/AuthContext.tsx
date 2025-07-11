import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    fullName: 'John Kamau',
    email: 'admin@gentsbyelegante.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: new Date()
  },
  {
    id: '2',
    fullName: 'Sarah Mwangi',
    email: 'sarah@gentsbyelegante.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: new Date()
  },
  {
    id: '3',
    fullName: 'Michael Ochieng',
    email: 'michael@gentsbyelegante.com',
    role: 'Sales Staff',
    status: 'Active',
    lastLogin: new Date()
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - accept any email with password "password"
    if (password === 'password' && email.includes('@')) {
      // Find user by email or create a default user
      let foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        // Create a default user for any valid email
        foundUser = {
          id: Date.now().toString(),
          fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: email,
          role: 'Admin',
          status: 'Active',
          lastLogin: new Date()
        };
      }
      
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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