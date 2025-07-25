import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PlayerBar from './PlayerBar'; // Assuming you have a PlayerBar component
import AudioPlayer from './AudioPlayer'; // The logic component
import Footer from './Footer'; // Import the new Footer component

const MainLayoutV2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#412C3A] to-[#0E1920] text-white">
      {/* Sidebar is fixed and always visible */}
      <Sidebar />

      {/* Main content area, with padding to avoid the fixed sidebar */}
      <main className="ml-64">
        {/* Header is sticky at the top of the main content area */}
        <Header />

        {/* The dynamic page content will be rendered here */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Player bar at the bottom */}
      <Footer />
      <PlayerBar />

      {/* Audio player logic (invisible) */}
      <AudioPlayer />
    </div>
  );
};

export default MainLayoutV2;
