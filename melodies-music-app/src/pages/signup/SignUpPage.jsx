import { useState } from 'react';
import { Eye, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Alert, Spin } from 'antd';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useAuthStore((state) => state.register);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(formData.name, formData.email, formData.password, formData.phoneNumber);
      navigate('/login'); // Navigate to login on successful registration
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(65, 44, 58, 0.80) 0%, rgba(65, 44, 58, 0.80) 100%), url('https://api.builder.io/api/v1/image/assets/TEMP/7654549a92e83a602da80ef9e1a33cc522eae061?width=860')`,
        }}
      />

      {/* Status Bar (from Figma, but usually handled by OS/global layout) */}
      {/* <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="text-white text-[15px] font-medium font-inter">10:00</div>
        <div className="flex items-center gap-2">
          <div className="w-[15px] h-[15px] bg-[#D9D9D9] rounded-sm"></div>
          <div className="w-[15px] h-[15px] bg-[#D9D9D9] rounded-full"></div>
          <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-b-[11.25px] border-l-transparent border-r-transparent border-b-[#D9D9D9]"></div>
        </div>
      </div> */}

      {/* Top Section */}
      <div className="relative z-10">
        <div className="w-full h-auto bg-[#412C3A] rounded-b-[40px] px-6 pb-6">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center gap-2 pt-8 mb-16">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/6e22457b5b023ddd6062f54883c8078fdbdf746b?width=136"
              alt="Melodies Logo"
              className="w-16 h-auto"
            />
            <h1 className="font-vazirmatn text-2xl font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent">
              Melodies
            </h1>
          </div>
        </div>

        {/* Back Button */}
        <Link to="/login" className="absolute left-10 top-40 z-20">
          <ArrowLeft className="w-10 h-10 text-[#0E9EEF]" strokeWidth={3} />
        </Link>

        {/* Main Content */}
        <div className="px-6 pt-16 pb-8">
          <h2 className="text-white font-vazirmatn text-2xl font-bold text-center mb-6">
            Sign Up To Continue
          </h2>

          {error && (
            <Alert message="Error" description={error} type="error" showIcon className="mb-4" />
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full h-16 px-4 py-3 bg-[#612C4F] rounded-[20px] text-white placeholder-white/60 font-vazirmatn text-sm font-bold shadow-[-1px_6px_4px_0_#612C4F] border-0 outline-none focus:ring-0"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-16 px-4 py-3 bg-[#612C4F] rounded-[20px] text-white placeholder-white/60 font-vazirmatn text-sm font-bold shadow-[-1px_6px_4px_0_#612C4F] border-0 outline-none focus:ring-0"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-16 px-4 py-3 bg-[#612C4F] rounded-[20px] text-white placeholder-white/60 font-vazirmatn text-sm font-bold shadow-[-1px_6px_4px_0_#612C4F] border-0 outline-none focus:ring-0 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <Eye className="w-5 h-5 text-[#EE10B0]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Phone Number Input */}
            <div className="relative">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full h-16 px-4 py-3 bg-[#612C4F] rounded-[20px] text-white placeholder-white/60 font-vazirmatn text-sm font-bold shadow-[-1px_6px_4px_0_#612C4F] border-0 outline-none focus:ring-0"
                required
              />
            </div>

            {/* Create Account Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-2 bg-[#EE10B0] rounded text-white font-vazirmatn text-sm font-bold min-w-[179px] h-9 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : 'Create an account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
