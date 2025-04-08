'use client';

import { useAuth } from '@/context/user';
import '@/lib/firebase/index';
import { User } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

export const InitFirebase = () => {
  const auth = getAuth();
  const { logIn, logOut } = useAuth();

  useEffect(() => {
    auth.onAuthStateChanged(async (userData: User | null): Promise<void> => {
      const data = userData
        ? {
            email: userData.email,
            uid: userData.uid,
          }
        : null;
      if (userData) logIn(data);
      else logOut();
    });
  }, []);

  return null;
};
