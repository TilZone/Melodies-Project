import { Search, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-lg border-b border-gray-800 z-30">
      {/* Search Bar */}
      <div className="relative flex-grow max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for artists, songs, albums..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-6 ml-auto">
        <button className="text-gray-400 hover:text-white transition-colors" title="Notifications">
          <Bell size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors" title="Settings">
          <Settings size={24} />
        </button>
        <Link to="/profile" className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40/FF00FF/FFFFFF?text=User"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
          />
          <span className="font-semibold text-white hidden md:block">John Doe</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
