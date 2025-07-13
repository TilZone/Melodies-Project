//form đăng nhập/đăng ký mới
// props type, onSubmit
//dùng chung
// components/AuthForm.jsx

import { Form } from 'antd';

const AuthForm = ({ onSubmit, children }) => (
  <Form layout="vertical" onFinish={onSubmit} requiredMark={false}>
    {children}
  </Form>
);

export default AuthForm;

  