import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Item } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
  spendGold: (amount: number) => void;
  addToHistory: (item: Item) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock database
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'Hero', gold: 500, inventory: [], history: [] } // Default user
  ]);

  const login = (username: string, password: string) => {
    // Password check skipped for simplicity in mock
    const foundUser = users.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (username: string, password: string) => {
    if (users.find(u => u.username === username)) return false;
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      gold: 500,
      inventory: [],
      history: []
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const spendGold = (amount: number) => {
    if (user && user.gold >= amount) {
      const updatedUser = { ...user, gold: user.gold - amount };
      setUser(updatedUser);
      // Update in "db" too
      setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const addToHistory = (item: Item) => {
    if (user) {
      const newHistoryItem = { timestamp: Date.now(), item };
      const updatedUser = {
        ...user,
        inventory: [...user.inventory, item],
        history: [...user.history, newHistoryItem]
      };
      setUser(updatedUser);
      setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, spendGold, addToHistory }}>
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
