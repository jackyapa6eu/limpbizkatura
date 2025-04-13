'use client';

import { SignInButton } from '@/components';
import { MODALS_NAMES, ModalProvider } from '@/context/modal';
import { useAuth } from '@/context/user';
import { useModal } from '@/hooks/useModal';
import { signOutAuth } from '@/lib/firebase/signOut';
import { CustomButton } from '@/ui';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import style from './header-auth.module.scss';

export const HeaderAuth: FC = observer(() => {
  const { user, logOut } = useAuth();
  const { openModal } = useModal();

  const handleLogOut = async () => {
    try {
      await signOutAuth();
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const isAdmin = useMemo(() => {
    return user?.role === 'admin';
  }, [user]);

  return (
    <ModalProvider>
      {!user ? (
        <SignInButton />
      ) : (
        <div className={style.headerAuth}>
          {isAdmin && (
            <CustomButton
              type="link"
              htmlType="button"
              onClick={() => openModal(MODALS_NAMES.CREATE_QUESTION)}
            >
              Создать вопрос
            </CustomButton>
          )}
          <span>{user.email}</span>
          <CustomButton onClick={handleLogOut} type="primary" htmlType="button">
            Выход
          </CustomButton>
        </div>
      )}
    </ModalProvider>
  );
});
