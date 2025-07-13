// Trường nhập liệụ
// label, name, type, calue, onchange
// dùng chung

// components/InputField.jsx

import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const InputField = ({ label, type, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isToggleable = type === 'password';
  const inputType = isToggleable ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="input-group">
      <input
        type={inputType}
        name={name}
        placeholder={label}
        required
        value={value}
        onChange={onChange}
        className="basic-input"
      />

      {isToggleable && (
        <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
          {showPassword ? (
            <EyeOutlined className="eye-icon" />
          ) : (
            < EyeInvisibleOutlined className="eye-icon" />
          )}
        </span>
      )}
    </div>
  );
};

export default InputField;

