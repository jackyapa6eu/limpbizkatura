'use client';

import { VALIDATION_RULES } from '@/const/validation';
import { useModal } from '@/hooks/useModal';
import React, { FC } from 'react';
import { Button, Form, FormProps, Input } from 'antd';
import classNames from 'classnames';

interface AuthFormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  setIsSignInAction: (value: boolean) => void;
}

export const SignInForm: FC<SignInFormProps> = ({ setIsSignInAction }) => {
  const { updateTitle } = useModal();
  const onFinish = (values: AuthFormData) => {
    console.log('Введенные данные:', values);
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo: unknown) => {
    console.log('Ошибка при отправке:', errorInfo);
  };

  const handleSetIsSignInAction = () => {
    updateTitle('Регистрация');
    setIsSignInAction(false);
  };

  return (
    <Form
      name="authForm"
      initialValues={{ remember: true }}
      layout="vertical"
      labelAlign="left"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={classNames('form')}
    >
      <Form.Item
        label="Email"
        name="email"
        className={classNames('form__item')}
        rules={[VALIDATION_RULES.REQUIRED(), VALIDATION_RULES.EMAIL()]}
      >
        <Input placeholder="Введите ваш email" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        className={classNames('form__item')}
        rules={[VALIDATION_RULES.REQUIRED()]}
      >
        <Input.Password placeholder="Введите ваш пароль" />
      </Form.Item>

      <div className={classNames('form__buttons-container')}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </div>
      <p>
        Еще нет аккаунта?{' '}
        <Button htmlType="button" onClick={handleSetIsSignInAction}>
          Зарегистрироваться
        </Button>{' '}
      </p>
    </Form>
  );
};
