'use client';

import React, { FC, ReactNode, createContext, useState } from 'react';

interface IUser {
  // name: string;
  email?: string | null;
  uid?: string;
  // role: 'user' | 'admin';
}

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<IUser | null>(null);

  const setUser = (user: IUser) => {
    setUserState(user);
  };

  const logout = () => {
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
