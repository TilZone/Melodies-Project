import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Dummy handler for now
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in...');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(65, 44, 58, 0.8), rgba(65, 44, 58, 0.8)), url('https://api.builder.io/api/v1/image/assets/TEMP/7654549a92e83a602da80ef9e1a33cc522eae061?width=860')`,
      }}
    >
      <div className="w-full max-w-md bg-[#412C3A]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-2">
            Melodies
          </h1>
          <p className="text-white text-xl font-bold">Login To Continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="E-Mail"
            required
            className="w-full h-14 px-5 py-3 bg-[#612C4F]/70 rounded-xl text-white placeholder-white/70 font-semibold border-2 border-transparent focus:border-pink-500 focus:outline-none transition-all"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              className="w-full h-14 px-5 py-3 bg-[#612C4F]/70 rounded-xl text-white placeholder-white/70 font-semibold border-2 border-transparent focus:border-pink-500 focus:outline-none transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-pink-500 rounded-lg text-black font-bold hover:bg-pink-600 transition-transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#412C3A] px-4 text-sm text-white/70">OR</span>
          </div>
        </div>

        <div className="space-y-4">{/* Social Login Buttons can be added here */}</div>

        <div className="text-center mt-8">
          <p className="text-white">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-bold text-blue-400 hover:underline">
              Sign Up Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
