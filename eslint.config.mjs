import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  recommendedConfig: {},
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    plugins: ['prettier'],
    extends: [
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      semi: ['error'],
      'prettier/prettier': 'error',
    },
  }),
];

export default eslintConfig;
