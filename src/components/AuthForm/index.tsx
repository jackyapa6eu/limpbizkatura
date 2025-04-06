'use client';

import { SignInForm } from '@/components/AuthForm/SignInForm';
import { SignUpForm } from '@/components/AuthForm/SignUpForm';
import React, { FC, useState } from 'react';

interface AuthFormProps {
  signIn?: boolean;
}

export const AuthForm: FC<AuthFormProps> = ({ signIn = true }) => {
  const [isSignIn, setIsSignIn] = useState<boolean>(signIn);

  return (
    <>
      {isSignIn ? (
        <SignInForm setIsSignInAction={setIsSignIn} />
      ) : (
        <SignUpForm setIsSignInAction={setIsSignIn} />
      )}
    </>
  );
};
