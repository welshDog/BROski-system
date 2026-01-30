import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser
    },
    plugins: {
      react: reactPlugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/react-in-jsx-scope': 'off'
    }
  }
];
