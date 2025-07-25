import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Dummy handler for now
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Signing up...');
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
          <p className="text-white text-xl font-bold">Create Your Account</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full h-14 px-5 py-3 bg-[#612C4F]/70 rounded-xl text-white placeholder-white/70 font-semibold border-2 border-transparent focus:border-pink-500 focus:outline-none transition-all"
          />
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

          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-8 py-4 bg-pink-500 rounded-lg text-black font-bold hover:bg-pink-600 transition-transform hover:scale-105"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center mt-8">
          <p className="text-white">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-400 hover:underline">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
