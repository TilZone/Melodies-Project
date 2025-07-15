import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login form submitted');
  };

  return (
    <div className="min-h-screen bg-[#412C3A] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(65,44,58,0.9)] to-[rgba(14,25,32,0.9)]"></div>

      <div className="relative z-10 flex flex-col justify-between min-h-screen p-6">
        {/* Header */}
        <div className="flex-shrink-0 text-center pt-8">
          <div className="inline-flex items-center gap-2 mb-16">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a464e4f82fd0b236675181000f6da0e8e026cd19?width=136"
              alt="Melodies Logo"
              className="w-16 h-auto"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent">
              Melodies
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-8">Login To Continue</h2>
        </div>

        {/* Login Form */}
        <div className="flex-grow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                className="w-full px-5 py-4 bg-[#612C4F]/80 rounded-2xl text-white placeholder-white/60 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#EE10B0] shadow-lg"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="w-full px-5 py-4 bg-[#612C4F]/80 rounded-2xl text-white placeholder-white/60 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#EE10B0] shadow-lg pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#EE10B0] hover:text-[#EE10B0]/80"
              >
                {showPassword ? <EyeInvisibleOutlined size={20} /> : <EyeOutlined size={20} />}
              </button>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button type="button" className="text-sm font-bold text-white/80 hover:text-white">
                Forgot password?
              </button>
              <button
                type="submit"
                className="bg-[#EE10B0] px-8 py-3 rounded-lg text-white text-sm font-bold hover:bg-[#d10f9f] transition-colors shadow-lg"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Footer section */}
        <div className="flex-shrink-0 text-center pb-4">
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px w-full bg-white/20"></div>
            <span className="text-white/80 font-semibold">OR</span>
            <div className="h-px w-full bg-white/20"></div>
          </div>
          <p className="text-white/80">Don&apos;t have an account?</p>
          <Link to="/signup" className="font-bold text-[#0E9EEF] hover:underline">
            Sign Up Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
