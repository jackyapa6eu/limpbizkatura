'use client';

import { SignInButton } from '@/components';
import { ModalProvider } from '@/context/modal';
import { AuthContext } from '@/context/user';
import React, { FC, useContext } from 'react';

export const HeaderAuth: FC = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('AuthContext должен быть использован внутри AuthProvider');
  }

  const { user } = auth;

  return <ModalProvider>{!user ? <SignInButton /> : 'ЗАРЕГАН'}</ModalProvider>;
};
