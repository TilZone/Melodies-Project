import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DiscoverPage from './pages/discover';
import ArtistListPage from './pages/artists'; // Correctly import the list page
import ArtistDetailPage from './pages/artists/ArtistDetailPage';
import AlbumDetailPage from './pages/albums/AlbumDetailPage';
import MusicPage from './pages/music'; // Import the main music page

// A simple placeholder for pages that are not yet built
const ComingSoonPage = ({ pageName }) => (
  <div className="flex justify-center items-center h-[calc(100vh-250px)]">
    <h2 className="text-2xl text-white font-bold">{pageName} is coming soon!</h2>
  </div>
);

const App = () => {
  return (
    <Routes>
      {/* Routes with MainLayout (Header, Nav, PlayerBar) */}
      <Route element={<MainLayout />}>
        {/* Redirects */}
        <Route path="/" element={<Navigate to="/discover" replace />} />
        <Route path="/home" element={<Navigate to="/discover" replace />} />

        {/* Main Pages */}
        <Route path="/discover" element={<DiscoverPage />} />

        {/* Artist Pages */}
        <Route path="/artists" element={<ArtistListPage />} />
        <Route path="/artists/:id" element={<ArtistDetailPage />} />

        {/* Album Page */}
        <Route path="/albums/:id" element={<AlbumDetailPage />} />

        {/* Music Player Page */}
        <Route path="/music/:id" element={<MusicPage />} />

        {/* Placeholder Pages */}
        <Route path="/library" element={<ComingSoonPage pageName="Library" />} />
        <Route path="/albums" element={<ComingSoonPage pageName="Albums" />} />
      </Route>

      {/* Full-screen routes or routes without MainLayout can be added here */}
      {/* e.g. <Route path="/login" element={<LoginPage />} /> */}

      {/* Fallback for any other route */}
      <Route path="*" element={<Navigate to="/discover" replace />} />
    </Routes>
  );
};

export default App;
