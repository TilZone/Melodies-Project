import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import AuthInput from '../../components/common/AuthInput';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic đăng ký sẽ được thêm vào sau
    console.log('Sign up form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#412C3A] to-[#412C3A] relative overflow-hidden flex flex-col">
      <div className="relative z-10 flex flex-col flex-grow justify-center px-6 py-8">
        <div className="max-w-md w-full mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-8 left-6 text-[#0E9EEF] hover:text-[#0E9EEF]/80 transition-colors"
          >
            <ArrowLeftOutlined className="text-3xl" />
          </button>

          <div className="flex flex-col items-center mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f1dd3645598d82144088e9c431df5be509626b2?width=136"
              alt="Melodies Logo"
              className="w-16 h-auto mb-2"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent">
              Melodies
            </h1>
          </div>

          <h2 className="text-white text-2xl font-bold text-center mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
            <AuthInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-Mail"
              required
            />
            <AuthInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              isPassword
              required
            />
            <AuthInput
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
            />

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-[#EE10B0] px-8 py-3 rounded text-white text-sm font-bold hover:bg-[#d90e9b] transition-colors w-full sm:w-auto"
              >
                Create an account
              </button>
            </div>
          </form>

          <div className="text-center mt-8">
            <p className="text-white">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#0E9EEF] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
