module.exports = {
    // Các môi trường mà code của bạn sẽ chạy
    env: {
      browser: true, // Dành cho code chạy trên trình duyệt
      es2020: true,  // Hỗ trợ cú pháp ES2020
      node: true,    // Hỗ trợ cú pháp Node.js (nếu bạn có script Node.js)
    },
    // Cấu hình các parser và plugin
    extends: [
      'eslint:recommended',         // Các quy tắc đề xuất của ESLint
      'plugin:react/recommended',   // Các quy tắc đề xuất cho React
      'plugin:react-hooks/recommended', // Các quy tắc cho React Hooks
      'plugin:prettier/recommended', // Tích hợp Prettier vào ESLint
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // Hỗ trợ cú pháp JSX
      },
      ecmaVersion: 12, // Phiên bản ECMAScript
      sourceType: 'module', // Loại module (ES Modules)
    },
    // Cấu hình các plugin
    plugins: [
      'react',
      'prettier',
      'react-hooks',
    ],
    // Các quy tắc riêng của bạn (ghi đè hoặc thêm vào)
    rules: {
      'prettier/prettier': 'error', // Báo lỗi nếu Prettier phát hiện vi phạm định dạng
      'react/react-in-jsx-scope': 'off', // Tắt quy tắc yêu cầu import React trong mỗi file JSX (React 17+ không cần)
      'react/prop-types': 'off',     // Tắt kiểm tra prop-types (nếu bạn dùng TypeScript hoặc không muốn kiểm tra strict)
      // Thêm các quy tắc khác nếu cần
    },
    settings: {
      react: {
        version: 'detect', // Tự động phát hiện phiên bản React
      },
    },
  };
  