import { NavLink, Link } from 'react-router-dom';
import { Home, Compass, MicVocal, Music, PlusSquare, Heart, Radio } from 'lucide-react';

// A reusable NavLink component for consistent styling
const SidebarLink = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 px-6 py-3 rounded-lg font-medium transition-colors ${
        isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`
    }
  >
    <Icon size={24} />
    <span>{children}</span>
  </NavLink>
);

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-black/50 backdrop-blur-lg p-6 flex flex-col z-40">
      {/* Logo */}
      <Link to="/discover" className="flex items-center gap-3 mb-10 px-4">
        <svg
          width="40"
          height="40"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0ZM45.0385 43.9303C44.3433 44.8333 43.1567 45.0541 42.2537 44.3588L30.0004 35.1454L17.7471 44.3588C16.8441 45.0541 15.6575 44.8333 14.9623 43.9303C14.267 43.0272 14.4878 41.8406 15.3909 41.1454L28.8893 31.1107L15.3909 21.076C14.4878 20.3807 14.267 19.1941 14.9623 18.2911C15.6575 17.3881 16.8441 17.1673 17.7471 17.8625L30.0004 27.0759L42.2537 17.8625C43.1567 17.1673 44.3433 17.3881 45.0385 18.2911C45.7338 19.1941 45.513 20.3807 44.6099 21.076L31.1115 31.1107L44.6099 41.1454C45.513 41.8406 45.7338 43.0272 45.0385 43.9303Z"
            fill="url(#logo-gradient)"
          />
          <defs>
            <linearGradient
              id="logo-gradient"
              x1="30"
              y1="0"
              x2="30"
              y2="60"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EE10B0" />
              <stop offset="1" stopColor="#0E9EEF" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-white text-2xl font-bold">Melodies</span>
      </Link>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-2">
        <SidebarLink to="/home" icon={Home}>
          Home
        </SidebarLink>
        <SidebarLink to="/discover" icon={Compass}>
          Discover
        </SidebarLink>
        <SidebarLink to="/artists" icon={MicVocal}>
          Artists
        </SidebarLink>
        <SidebarLink to="/albums" icon={Music}>
          Albums
        </SidebarLink>
      </nav>

      <hr className="border-gray-700 my-6" />

      {/* Secondary Navigation */}
      <nav className="flex flex-col gap-2">
        <h3 className="px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Library
        </h3>
        <SidebarLink to="/library/create-playlist" icon={PlusSquare}>
          Create Playlist
        </SidebarLink>
        <SidebarLink to="/library/liked-songs" icon={Heart}>
          Liked Songs
        </SidebarLink>
        <SidebarLink to="/library/radio" icon={Radio}>
          Radio
        </SidebarLink>
      </nav>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Footer/User Info (Optional) */}
      <div>{/* You can add user info or a logout button here later */}</div>
    </aside>
  );
};

export default Sidebar;
