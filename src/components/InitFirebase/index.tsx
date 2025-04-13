'use client';

import { useAuth } from '@/context/user';
import { getData } from '@/lib/firebase/getData';
import '@/lib/firebase/index';
import { User } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

export const InitFirebase = () => {
  const auth = getAuth();
  const { logIn, logOut } = useAuth();

  useEffect(() => {
    auth.onAuthStateChanged(async (userData: User | null): Promise<void> => {
      if (userData) {
        const data = await getData(`users/${userData.uid}`);
        logIn(data);
      } else logOut();
    });
  }, [auth, logIn, logOut]);

  return null;
};
