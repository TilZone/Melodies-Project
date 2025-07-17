import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthInput from '../../components/common/AuthInput';
import SocialButton from '../../components/common/SocialButton';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    // Logic đăng nhập sẽ được thêm vào sau
    console.log('Login form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#412C3A] to-[#412C3A] relative overflow-hidden flex flex-col">
      {/* Main content */}
      <div className="relative z-10 flex flex-col flex-grow justify-center px-6 py-8">
        <div className="max-w-md w-full mx-auto">
          {/* Logo and brand */}
          <div className="flex flex-col items-center mb-12">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a464e4f82fd0b236675181000f6da0e8e026cd19?width=136"
              alt="Melodies Logo"
              className="w-16 h-auto mb-2"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent">
              Melodies
            </h1>
          </div>

          {/* Login form */}
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold text-center mb-6">Login To Continue</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="flex justify-between items-center pt-2">
                <Link to="/forgot-password" className="text-sm text-white hover:text-white/80">
                  Forgot password?
                </Link>
                <button
                  type="submit"
                  className="bg-[#EE10B0] px-8 py-2 rounded text-white text-sm font-bold hover:bg-[#d90e9b] transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#412C3A] text-white/60">OR</span>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SocialButton provider="Google" />
            <SocialButton provider="Facebook" />
          </div>

          {/* Sign up section */}
          <div className="text-center mt-8">
            <p className="text-white">
              Don&apos;t Have An Account?{' '}
              <Link to="/signup" className="font-bold text-[#0E9EEF] hover:underline">
                Sign Up Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
