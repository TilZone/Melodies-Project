import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayoutV2 from './components/layout/MainLayoutV2';
import HomePage from './pages/home/HomePage';
import DiscoverPage from './pages/discover';
import ArtistListPage from './pages/artists';
import ArtistDetailPage from './pages/artists/ArtistDetailPage';
import AlbumDetailPage from './pages/albums/AlbumDetailPage';
import MusicPage from './pages/music-player';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import LoadingPage from './pages/loading'; // Import the new LoadingPage

// Placeholder for pages that are not yet fully integrated
const ComingSoonPage = ({ pageName }) => (
  <div className="flex justify-center items-center h-[calc(100vh-250px)]">
    <h2 className="text-2xl text-white font-bold">{pageName} is coming soon!</h2>
  </div>
);

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Initial loading page */}
        <Route path="/loading" element={<LoadingPage />} />

        {/* Routes with the new MainLayoutV2 */}
        <Route element={<MainLayoutV2 />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/artists" element={<ArtistListPage />} />
          <Route path="/artists/:id" element={<ArtistDetailPage />} />
          <Route path="/albums" element={<ComingSoonPage pageName="Albums" />} />
          <Route path="/albums/:id" element={<AlbumDetailPage />} />
          <Route path="/music/:id" element={<MusicPage />} />
          <Route path="/library" element={<ComingSoonPage pageName="Library" />} />
          <Route path="/premium" element={<ComingSoonPage pageName="Premium" />} />
          <Route path="/contact" element={<ComingSoonPage pageName="Contact" />} />
          <Route path="/about" element={<ComingSoonPage pageName="About" />} />
        </Route>

        {/* Full-screen routes without the main layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Root path redirects to loading page */}
        <Route path="/" element={<Navigate to="/loading" replace />} />

        {/* Fallback for any other route, redirects to loading page */}
        <Route path="*" element={<Navigate to="/loading" replace />} />
      </Routes>
    </>
  );
};

export default App;
