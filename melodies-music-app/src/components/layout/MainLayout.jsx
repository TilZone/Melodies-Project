import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  SearchOutlined,
  HomeOutlined,
  CompassOutlined,
  ReconciliationOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import PlayerBar from './PlayerBar';
import AudioPlayer from './AudioPlayer'; // Import the AudioPlayer
import ThemeToggle from '../common/ThemeToggle';

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center gap-1 ${
        isActive ? 'text-pink-500 dark:text-[#EE10B0]' : 'text-sky-600 dark:text-[#0E9EEF]'
      }`
    }
  >
    {React.createElement(icon, { className: 'text-[32px]' })}
    <span className="text-sm">{label}</span>
  </NavLink>
);

const MainLayout = () => {
  const { pathname } = useLocation(); // Use useLocation hook for dynamic title

  const getHeaderTitle = (path) => {
    if (path.startsWith('/artist/')) return 'Artist Details';
    if (path.startsWith('/album/')) return 'Album Details';
    if (path.startsWith('/music/')) return 'Now Playing';

    switch (path) {
      case '/discover':
        return (
          <React.Fragment>
            <span className="text-[#0E9EEF]">Disc</span>
            <span className="text-[#EE10B0]">over</span>
          </React.Fragment>
        );
      case '/artists':
        return 'Artists';
      case '/albums':
        return 'Albums';
      case '/library':
        return 'Library';
      default:
        return 'Melodies';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-[#412C3A] dark:to-[#0E1920] text-gray-800 dark:text-white transition-colors duration-300">
      <AudioPlayer /> {/* Add the player here */}
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <button>
          <SearchOutlined className="text-[#0E9EEF] text-[32px]" />
        </button>
        <h1 className="text-[32px] font-bold text-center">{getHeaderTitle(pathname)}</h1>
        <ThemeToggle />
      </header>
      {/* Main Content */}
      <main className="px-6 pb-32">
        {' '}
        {/* Add padding-bottom to avoid overlap with nav */}
        <Outlet />
      </main>
      {/* Player Bar - Sits above the navigation */}
      <PlayerBar />
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0E1920] rounded-t-[20px] px-6 py-4 z-50">
        <div className="flex justify-around items-end">
          <NavItem to="/" icon={HomeOutlined} label="Home" />
          <NavItem to="/discover" icon={CompassOutlined} label="Discover" />
          <NavItem to="/albums" icon={ReconciliationOutlined} label="Albums" />
          <NavItem to="/library" icon={FolderOutlined} label="Library" />
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
