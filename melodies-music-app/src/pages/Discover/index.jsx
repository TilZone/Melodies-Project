import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNewReleases } from '../../services/song.service';
import { fetchPopularArtists } from '../../services/artist.service';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Spin, Alert } from 'antd';

// Import các component chung đã có
import SongCard from '../../components/common/SongCard';
import ArtistCard from '../../components/common/ArtistCard';
import SectionHeader from '../../components/common/SectionHeader';
import PlaylistCard from '../../components/common/PlaylistCard';
import VideoCard from '../../components/common/VideoCard';

// --- Dữ liệu giả cho các mục chưa có API ---
const musicGenres = [
  {
    id: 'genre-rap',
    title: 'Rap Songs',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/600b13286779ca5cabec43911431482d1764ef12?width=240',
  },
  {
    id: 'genre-pop',
    title: 'Pop Songs',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/72a341eb8ad8787df0a74b6db09e5eec857670c1?width=240',
  },
  {
    id: 'genre-rock',
    title: 'Rock Songs',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/c8bf053e1ca02040e9b66ab8d160f8465efb8a40?width=240',
  },
];

const moodPlaylists = [
  {
    id: 'mood-sad',
    title: 'Sad Songs',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/3441dca70a4a4693fb01bd635b2c5dcb1ae62ebc?width=240',
  },
  {
    id: 'mood-workout',
    title: 'Workout Songs',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/5acb75d9dbabcd4dcc7aabf2464980213f5795d9?width=240',
  },
  {
    id: 'mood-chill',
    title: 'Chill Songs',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/2e3301c0e941d3386fabd8b84e3823f019674d00?width=240',
  },
];

const musicVideos = [
  {
    id: 'video-1',
    title: 'Shake It Off',
    artist: 'Taylor swift',
    views: '4.4M views',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/2c0ec2b9c2061240a121fad0947a67a13246cbf3?width=280',
  },
  {
    id: 'video-2',
    title: 'Shape Of You',
    artist: 'Ed Sheeran',
    views: '4.2M views',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/d9fd85350dc7686ed28266990033de6ade6c9fe4?width=280',
  },
  {
    id: 'video-3',
    title: 'New Rules',
    artist: 'Dualipa',
    views: '3.7M views',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/ec203d52aec97e9fa0e8ea5422ab352c2d07dae2?width=280',
  },
  {
    id: 'video-4',
    title: 'Someone Like You',
    artist: 'Adele',
    views: '3.5M views',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f41a8a744de070e5a2bd8b8a4c6740811a7c03a5?width=280',
  },
  {
    id: 'video-5',
    title: 'Lovely',
    artist: 'billie, khalid',
    views: '2.3M views',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/73e8f6f2415db84d1c2658969db60e045db619a1?width=280',
  },
  {
    id: 'video-6',
    title: 'Waka Waka',
    artist: 'Shakira',
    views: '2.1M views',
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/baaedae6c7bfc3be421e5c3c30d4e79ff5bb3442?width=280',
  },
];
// --- Kết thúc dữ liệu giả ---

const DiscoverPage = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const playSong = usePlayerStore((state) => state.playSong);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [releases, artists] = await Promise.all([fetchNewReleases(), fetchPopularArtists()]);
        setNewReleases(releases?.items || []);
        setPopularArtists(artists?.items || []);
      } catch (err) {
        console.error('Failed to load discovery data:', err);
        setError('Could not load discovery data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSongClick = (song) => {
    playSong(song, newReleases); // Cung cấp cả danh sách phát
  };

  const handleArtistClick = (artistId) => {
    navigate(`/artists/${artistId}`);
  };

  const handleVideoClick = (video) => {
    // Chuyển hướng đến trang chi tiết video (sẽ được tạo sau)
    // navigate(`/video/${video.id}`);
    console.log('Playing video:', video);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        return (
      <div className="p-4">
        <Alert
          message="Could Not Load Discovery Data"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
      </div>
    );
  }

  return (
    // Sử dụng layout từ Figma, loại bỏ các phần thuộc về layout chung
    <div className="space-y-8 pb-24">
      {/* Music Genres */}
      <section>
        <SectionHeader title="Music" highlight="Genres" onViewAll={() => navigate('/genres')} />
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
          {musicGenres.map((genre) => (
            <PlaylistCard
              key={genre.id}
              title={genre.title}
              image={genre.image}
              onClick={() => navigate(`/genre/${genre.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Mood Playlists */}
      <section>
        <SectionHeader title="Mood" highlight="Playlists" onViewAll={() => navigate('/moods')} />
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
          {moodPlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              title={playlist.title}
              image={playlist.image}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
            />
          ))}
        </div>
      </section>

      {/* New Release Songs */}
      <section>
        <SectionHeader
          title="New Release"
          highlight="Songs"
          onViewAll={() => navigate('/songs/new-releases')}
        />
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
          {newReleases.length > 0 ? (
            newReleases.map((song) => (
              <div key={song._id} onClick={() => handleSongClick(song)}>
                <SongCard
                  title={song.title}
                  artist={song.artist?.name || 'Unknown Artist'}
                  image={song.coverArt}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No new releases found.</p>
          )}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <SectionHeader title="Popular" highlight="Artists" onViewAll={() => navigate('/artists')} />
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {popularArtists.length > 0 ? (
            popularArtists.map((artist) => (
              <div key={artist._id} onClick={() => handleArtistClick(artist._id)}>
                <ArtistCard name={artist.name} image={artist.imageUrl} />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No popular artists found.</p>
          )}
        </div>
      </section>

      {/* Popular Music Video - Theo thiết kế Figma */}
      <section>
        <SectionHeader
          title="Popular"
          highlight="Music Video"
          onViewAll={() => navigate('/videos')}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {musicVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              artist={video.artist}
              views={video.views}
              image={video.image}
              onClick={() => handleVideoClick(video)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiscoverPage;
