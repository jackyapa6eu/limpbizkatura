'use client';

import { VALIDATION_RULES } from '@/const/validation';
import React, { FC } from 'react';
import { Button, Form, FormProps, Input } from 'antd';
import classNames from 'classnames';

interface AuthFormData {
  email: string;
  password: string;
}

export const AuthForm: FC = () => {
  const onFinish = (values: AuthFormData) => {
    console.log('Введенные данные:', values);
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo: unknown) => {
    console.log('Ошибка при отправке:', errorInfo);
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
    </Form>
  );
};
