'use client';

import { AuthForm } from '@/components';
import { MODAL_SIZES } from '@/components/CustomModal';
import { useModal } from '@/hooks/useModal';
import { CustomButton } from '@/ui';
import '@ant-design/v5-patch-for-react-19';
import React, { FC } from 'react';

export const SignInButton: FC = () => {
  const { showModal } = useModal();

  const handleLoginClick = () => {
    showModal(<AuthForm signIn={true} />, 'Вход', MODAL_SIZES.SMALL);
  };

  return (
    <div>
      <CustomButton onClick={handleLoginClick} type="primary">
        Вход
      </CustomButton>
    </div>
  );
};
