// nút hoàn tất đăng ký
//props text, onClick
//dùng chung

// components/SubmitButton.jsx

import { Button } from 'antd';

const SubmitButton = ({ text }) => (
  <Button
    htmlType="submit"
    type="primary"
    className="custom-submit-button"
  >
    {text}
  </Button>
);

export default SubmitButton;


