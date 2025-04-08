'use client';

import { SignInButton } from '@/components';
import { ModalProvider } from '@/context/modal';
import { useAuth } from '@/context/user';
import { signOutAuth } from '@/lib/firebase/signOut';
import { CustomButton } from '@/ui';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

export const HeaderAuth: FC = observer(() => {
  const { user, logOut } = useAuth();

  const handleLogOut = async () => {
    try {
      await signOutAuth();
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalProvider>
      {!user ? (
        <SignInButton />
      ) : (
        <div>
          <span>{user.email}</span>
          <CustomButton onClick={handleLogOut} type="primary" htmlType="button">
            Выход
          </CustomButton>
        </div>
      )}
    </ModalProvider>
  );
});
