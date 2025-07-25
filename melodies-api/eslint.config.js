import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from './.prettierrc.js';

export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', prettierConfig],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Bỏ qua biến bắt đầu bằng _
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'coverage/', 'package-lock.json', 'yarn.lock', '.env'],
  },
];
