'use client';

import { IUser, authStore } from '@/store/user';
import React, { FC, ReactNode, createContext, useContext } from 'react';

interface AuthContextType {
  user: IUser | null;
  logIn: (user: IUser | null) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthStoreContext = createContext(authStore);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthStoreContext.Provider value={authStore}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuth = () => useContext(AuthStoreContext);
