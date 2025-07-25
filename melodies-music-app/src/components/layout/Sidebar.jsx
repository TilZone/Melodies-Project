import { NavLink } from 'react-router-dom';
import {
  Home,
  Compass,
  Music,
  MicVocal,
  Library,
  Heart,
  Plus,
  Settings,
  LogOut,
} from 'lucide-react';

const NavItem = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 mb-2 hover:bg-white/10 rounded-lg transition-colors ${
        isActive ? 'bg-white/20 text-white' : 'text-gray-400'
      }`
    }
  >
    <Icon className="w-6 h-6 mr-4" />
    <span className="font-semibold">{children}</span>
  </NavLink>
);

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 w-64 h-full bg-[#0E1920] z-20 p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent">
          Melodies
        </h1>
      </div>

      <nav className="flex-grow">
        {/* Menu Section */}
        <div className="mb-6">
          <p className="text-pink-500/80 text-xs font-semibold tracking-wider uppercase mb-3">
            Menu
          </p>
          <NavItem to="/home" icon={Home}>
            Home
          </NavItem>
          <NavItem to="/discover" icon={Compass}>
            Discover
          </NavItem>
          <NavItem to="/albums" icon={Music}>
            Albums
          </NavItem>
          <NavItem to="/artists" icon={MicVocal}>
            Artists
          </NavItem>
        </div>

        {/* Library Section */}
        <div className="mb-6">
          <p className="text-pink-500/80 text-xs font-semibold tracking-wider uppercase mb-3">
            Library
          </p>
          <NavItem to="/library/recent" icon={Library}>
            Recently Added
          </NavItem>
          <NavItem to="/library/favorites" icon={Heart}>
            Favorites
          </NavItem>
          <button className="flex items-center px-4 py-3 w-full text-left text-blue-400 hover:bg-white/10 rounded-lg transition-colors">
            <Plus className="w-6 h-6 mr-4" />
            <span className="font-semibold">Add Playlist</span>
          </button>
        </div>
      </nav>

      {/* General Section */}
      <div>
        <p className="text-pink-500/80 text-xs font-semibold tracking-wider uppercase mb-3">
          General
        </p>
        <NavItem to="/settings" icon={Settings}>
          Settings
        </NavItem>
        <button className="flex items-center px-4 py-3 w-full text-left text-pink-500 hover:bg-white/10 rounded-lg transition-colors">
          <LogOut className="w-6 h-6 mr-4" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
