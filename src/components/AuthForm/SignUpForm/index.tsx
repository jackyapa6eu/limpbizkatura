'use client';

import { VALIDATION_MESSAGES, VALIDATION_RULES } from '@/const/validation';
import { AuthContext } from '@/context/user';
import { useFormValidation } from '@/hooks/useFormIsValid';
import { useModal } from '@/hooks/useModal';
import { updateData } from '@/lib/firebase/pushData';
import { registerWithAuth } from '@/lib/firebase/signUp';
import { CustomButton } from '@/ui';
import React, { FC, useContext, useEffect } from 'react';
import { Form, FormProps, Input, notification } from 'antd';
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
  const { updateTitle, closeModal } = useModal();
  const [form] = Form.useForm();
  const { isFormValid, handleValuesChange } = useFormValidation(form);

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('AuthContext должен быть использован внутри AuthProvider');
  }

  const { setUser } = auth;

  const onFinish = async (values: AuthFormData) => {
    try {
      const userData = await registerWithAuth(values);
      const data = {
        email: userData?.user.email,
        uid: userData?.user.uid,
      };
      await updateData(`users/${userData?.user.uid}`, data);
      setUser(data);
      notification.success({ message: 'Регистрация прошла успешно.' });
      closeModal();
    } catch (err) {
      console.log(err);
    }
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
      form={form}
      name="authForm"
      initialValues={{ remember: true }}
      layout="vertical"
      labelAlign="left"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={handleValuesChange}
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
        dependencies={['confirmPassword']}
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
          VALIDATION_RULES.REQUIRED(VALIDATION_MESSAGES.PASSWORD_REQUIRED),
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(VALIDATION_MESSAGES.PASSWORDS_NOT_MATCH)
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Повторите ваш пароль" />
      </Form.Item>

      <div className={classNames('form__buttons-container')}>
        <CustomButton type="primary" htmlType="submit" disabled={!isFormValid}>
          Регистрация
        </CustomButton>
      </div>
      <p>
        Есть аккаунт?{' '}
        <CustomButton
          type="link"
          htmlType="button"
          onClick={handleSetIsSignInAction}
        >
          Войти
        </CustomButton>
      </p>
    </Form>
  );
};
