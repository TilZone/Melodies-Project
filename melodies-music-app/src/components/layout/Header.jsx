import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-[#121A21]/80 backdrop-blur-sm sticky top-0 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
          <input
            type="text"
            placeholder="Search for music, artists, albums..."
            className="w-full bg-white/5 rounded-full pl-12 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          />
        </div>
      </div>

      {/* Navigation & Auth Buttons */}
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            className="text-gray-300 font-semibold hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 font-semibold hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/premium"
            className="text-gray-300 font-semibold hover:text-white transition-colors"
          >
            Premium
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-transparent border border-pink-500 rounded-full text-pink-500 font-semibold hover:bg-pink-500 hover:text-black transition-colors">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-2 bg-pink-500 rounded-full text-black font-semibold hover:bg-pink-600 transition-colors">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
