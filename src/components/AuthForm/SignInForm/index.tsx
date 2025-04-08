'use client';

import { VALIDATION_RULES } from '@/const/validation';
import { useAuth } from '@/context/user';
import { useFormValidation } from '@/hooks/useFormIsValid';
import { useModal } from '@/hooks/useModal';
import { getData } from '@/lib/firebase/getData';
import { signInWithAuth } from '@/lib/firebase/signIn';
import { CustomButton } from '@/ui';
import React, { FC } from 'react';
import { Form, FormProps, Input, notification } from 'antd';
import classNames from 'classnames';

interface AuthFormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  setIsSignInAction: (value: boolean) => void;
}

export const SignInForm: FC<SignInFormProps> = ({ setIsSignInAction }) => {
  const { updateTitle, closeModal } = useModal();
  const [form] = Form.useForm();
  const { isFormValid, handleValuesChange } = useFormValidation(form);

  const { logIn } = useAuth();

  const onFinish = async (values: AuthFormData) => {
    try {
      const userData = await signInWithAuth(values);
      const data = await getData(`users/${userData?.user.uid}`);
      logIn(data);
      notification.success({ message: 'Авторизация прошла успешно.' });
      closeModal();
    } catch (err) {
      console.log(err);
    }
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
