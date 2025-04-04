import { Rule } from 'antd/lib/form';

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Обязательное поле.',
  EMAIL: 'Введите корректный email адрес.',
} as const;

export const VALIDATION_RULES = {
  REQUIRED: (msg?: string): Rule => ({
    required: true,
    message: msg ?? VALIDATION_MESSAGES.REQUIRED,
  }),
  EMAIL: (msg?: string): Rule => ({
    type: 'email',
    message: msg ?? VALIDATION_MESSAGES.EMAIL,
  }),
} as const;
