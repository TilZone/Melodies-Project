import { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import { fetchNewReleases } from '../../services/song.service';
import { fetchPopularArtists } from '../../services/artist.service';

import SectionHeader from '../../components/common/SectionHeader';
import SongCard from '../../components/common/SongCard';
import ArtistCard from '../../components/common/ArtistCard';
import VideoCard from '../../components/common/VideoCard';
import PlaylistCard from '../../components/common/PlaylistCard'; // Sử dụng PlaylistCard cho Genre và Mood

// --- Dữ liệu giả cho các phần chưa có API ---
const musicGenres = [
  {
    id: 'genre-1',
    title: 'Rap Songs',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/600b13286779ca5cabec43911431482d1764ef12?width=240',
  },
  {
    id: 'genre-2',
    title: 'Pop Songs',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/72a341eb8ad8787df0a74b6db09e5eec857670c1?width=240',
  },
  {
    id: 'genre-3',
    title: 'Rock Songs',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/c8bf053e1ca02040e9b66ab8d160f8465efb8a40?width=240',
  },
];

const moodPlaylists = [
  {
    id: 'mood-1',
    title: 'Sad Songs',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/3441dca70a4a4693fb01bd635b2c5dcb1ae62ebc?width=240',
  },
  {
    id: 'mood-2',
    title: 'Workout Songs',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/5acb75d9dbabcd4dcc7aabf2464980213f5795d9?width=240',
  },
  {
    id: 'mood-3',
    title: 'Chill Songs',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/2e3301c0e941d3386fabd8b84e3823f019674d00?width=240',
  },
];

const musicVideos = [
  {
    id: 'video-1',
    title: 'Shake It Off',
    artist: { name: 'Taylor swift' },
    views: '4.4M views',
    thumbnail:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/2c0ec2b9c2061240a121fad0947a67a13246cbf3?width=280',
  },
  {
    id: 'video-2',
    title: 'Shape Of You',
    artist: { name: 'Ed Sheeran' },
    views: '4.2M views',
    thumbnail:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/d9fd85350dc7686ed28266990033de6ade6c9fe4?width=280',
  },
  {
    id: 'video-3',
    title: 'New Rules',
    artist: { name: 'Dualipa' },
    views: '3.7M views',
    thumbnail:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/ec203d52aec97e9fa0e8ea5422ab352c2d07dae2?width=280',
  },
  {
    id: 'video-4',
    title: 'Somone Like you',
    artist: { name: 'Adele' },
    views: '3.5M views',
    thumbnail:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f41a8a744de070e5a2bd8b8a4c6740811a7c03a5?width=280',
  },
  {
    id: 'video-5',
    title: 'Lovely',
    artist: { name: 'billie, khalid' },
    views: '2.3M views',
    thumbnail:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/73e8f6f2415db84d1c2658969db60e045db619a1?width=280',
  },
  {
    id: 'video-6',
    title: 'Waka Waka',
    artist: { name: 'Shakira' },
    views: '2.1M views',
    thumbnail:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/baaedae6c7bfc3be421e5c3c30d4e79ff5bb3442?width=280',
  },
];
// --- Kết thúc dữ liệu giả ---

const DiscoverPage = () => {
  const [newSongs, setNewSongs] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [songsResponse, artistsResponse] = await Promise.all([
          fetchNewReleases(),
          fetchPopularArtists(),
        ]);
        setNewSongs(songsResponse.data || []);
        setPopularArtists(artistsResponse.data || []);
      } catch (err) {
        setError('Failed to load discovery data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="text-white pb-24">
      {/* Main Content */}
      <div className="px-6 space-y-8">
        {/* Music Genres */}
        <section>
          <SectionHeader title="Music" highlight="Genres" />
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
            {musicGenres.map((genre) => (
              <PlaylistCard key={genre.id} title={genre.title} image={genre.picture_medium} />
            ))}
          </div>
        </section>

        {/* Mood Playlists */}
        <section>
          <SectionHeader title="Mood" highlight="Playlists" />
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
            {moodPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                title={playlist.title}
                image={playlist.picture_medium}
              />
            ))}
          </div>
        </section>

        {/* New Release Songs */}
        <section>
          <SectionHeader title="New Release" highlight="Songs" />
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
            {newSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>

        {/* Popular Artists */}
        <section>
          <SectionHeader title="Popular" highlight="Artists" />
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {popularArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>

        {/* Popular Music Video */}
        <section>
          <SectionHeader title="Popular" highlight="Music Video" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {musicVideos.map((video) => (
              <VideoCard
                key={video.id}
                title={video.title}
                artist={video.artist.name}
                views={video.views}
                image={video.thumbnail}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiscoverPage;
