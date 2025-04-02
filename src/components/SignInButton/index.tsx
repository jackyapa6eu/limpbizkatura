'use client';

import { AuthForm } from '@/components';
import { useModal } from '@/hooks/useModal';
import '@ant-design/v5-patch-for-react-19';
import React, { FC } from 'react';
import { Button } from 'antd';

export const SignInButton: FC = () => {
  const { showModal } = useModal();

  const handleLoginClick = () => {
    showModal(<AuthForm />, 'Вход');
  };

  return (
    <div>
      <Button onClick={handleLoginClick} type="primary">
        Вход
      </Button>
    </div>
  );
};
