// melodies-music-app/eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from './.prettierrc.js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pluginJs.configs.recommended,
  {
    // Áp dụng các quy tắc cho các file JavaScript và JSX
    files: ['**/*.{js,jsx}'],
    // Thêm các plugin React và Prettier
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      prettier: prettierPlugin,
    },
    // Định nghĩa các quy tắc ESLint
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': ['error', prettierConfig],
      'react/prop-types': 'off',
    },
  },
  {
    // Các file/thư mục mà ESLint sẽ bỏ qua
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      'package-lock.json',
      'yarn.lock',
      '.env',
      '.prettierrc.js',
      '.eslintrc.js',
    ],
  },
];
