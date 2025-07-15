import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement sign up logic
    console.log('Sign up form submitted');
  };

  return (
    <div className="min-h-screen bg-[#412C3A] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(65,44,58,0.9)] to-[rgba(14,25,32,0.9)]"></div>

      <div className="relative z-10 flex flex-col min-h-screen p-6">
        {/* Header */}
        <header className="flex-shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="text-[#0E9EEF] hover:text-white transition-colors"
          >
            <ArrowLeftOutlined className="text-3xl" />
          </button>
        </header>

        {/* Form Section */}
        <main className="flex-grow flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-white/70">Let&apos;s get you started!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-5 py-4 bg-[#612C4F]/80 rounded-2xl text-white placeholder-white/60 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#EE10B0] shadow-lg"
                required
              />
            </div>
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
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#EE10B0] py-4 rounded-lg text-white font-bold hover:bg-[#d10f9f] transition-colors shadow-lg"
              >
                Create Account
              </button>
            </div>
          </form>
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 text-center pb-4">
          <p className="text-white/80">
            Don&apos;t have an account?{' '}
            <Link to="/login" className="font-bold text-[#0E9EEF] hover:underline">
              Login
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignUpPage;
