'use client';

import { SignInButton } from '@/components';
import { ModalProvider } from '@/context/modal';
import React, { FC } from 'react';

export const HeaderAuth: FC = () => {
  return (
    <ModalProvider>
      <SignInButton />
    </ModalProvider>
  );
};
