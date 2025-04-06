'use client';

import { VALIDATION_RULES } from '@/const/validation';
import { AuthContext } from '@/context/user';
import { useFormValidation } from '@/hooks/useFormIsValid';
import { useModal } from '@/hooks/useModal';
import { CustomButton } from '@/ui';
import React, { FC, useContext } from 'react';
import { Form, FormProps, Input } from 'antd';
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
  const [form] = Form.useForm();
  const { isFormValid, handleValuesChange } = useFormValidation(form);
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('AuthContext должен быть использован внутри AuthProvider');
  }

  const { setUser } = auth;

  const onFinish = (values: AuthFormData) => {
    console.log('Введенные данные:', values);
    setUser({ name: 'Eugene', email: 'yapa6eu@gmail.com', role: 'admin' });
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
      form={form}
      name="authForm"
      initialValues={{ remember: true }}
      layout="vertical"
      labelAlign="left"
      onFinish={onFinish}
      onValuesChange={handleValuesChange}
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
        <CustomButton type="primary" htmlType="submit" disabled={!isFormValid}>
          Войти
        </CustomButton>
      </div>
      <p>
        Еще нет аккаунта?{' '}
        <CustomButton
          type="link"
          htmlType="button"
          onClick={handleSetIsSignInAction}
        >
          Регистрация
        </CustomButton>{' '}
      </p>
    </Form>
  );
};
