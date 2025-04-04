'use client';

import { VALIDATION_RULES } from '@/const/validation';
import { useModal } from '@/hooks/useModal';
import React, { FC } from 'react';
import { Button, Form, FormProps, Input } from 'antd';
import classNames from 'classnames';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  setIsSignInAction: (value: boolean) => void;
}

export const SignUpForm: FC<SignUpFormProps> = ({ setIsSignInAction }) => {
  const { updateTitle } = useModal();
  const onFinish = (values: AuthFormData) => {
    console.log('Введенные данные:', values);
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo: unknown) => {
    console.log('Ошибка при отправке:', errorInfo);
  };

  const handleSetIsSignInAction = () => {
    updateTitle('Вход');
    setIsSignInAction(true);
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

      <Form.Item
        label="Повторите пароль"
        name="confirmPassword"
        dependencies={['password']}
        className={classNames('form__item')}
        hasFeedback
        rules={[
          { required: true, message: 'Пожалуйста, подтвердите пароль!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Повторите ваш пароль" />
      </Form.Item>

      <div className={classNames('form__buttons-container')}>
        <Button type="primary" htmlType="submit">
          Регистрация
        </Button>
      </div>
      <p>
        Есть аккаунт?{' '}
        <Button htmlType="button" onClick={handleSetIsSignInAction}>
          Войти
        </Button>{' '}
      </p>
    </Form>
  );
};
