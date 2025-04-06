'use client';

import { AuthForm } from '@/components';
import { MODAL_SIZES } from '@/components/CustomModal';
import { MODALS_NAMES } from '@/context/modal';
import { useModal } from '@/hooks/useModal';
import { CustomButton } from '@/ui';
import '@ant-design/v5-patch-for-react-19';
import React, { FC } from 'react';

export const SignInButton: FC = () => {
  const { openModal } = useModal();

  const handleLoginClick = () => {
    openModal(MODALS_NAMES.SIGN_IN);
  };

  return (
    <div>
      <CustomButton onClick={handleLoginClick} type="primary">
        Вход
      </CustomButton>
    </div>
  );
};
