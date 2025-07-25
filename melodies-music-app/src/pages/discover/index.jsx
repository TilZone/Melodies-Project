import { Link } from 'react-router-dom';
import { Play, Plus, Music } from 'lucide-react';
import useDiscoverData from '../../hooks/useDiscoverData';
import { usePlayerStore } from '../../store/usePlayerStore';
import SongCard from '../../components/common/SongCard';
import ArtistCard from '../../components/common/ArtistCard';
import Section from '../../components/common/Section';
import { Skeleton } from '../../components/ui/skeleton';

const DiscoverPage = () => {
  const { newSongs, popularArtists, loadingNewSongs, loadingPopularArtists } = useDiscoverData();
  const { activeSong, isPlaying, togglePlayPause, playSong } = usePlayerStore();

  const handlePlayPauseClick = (song, queue, i) => {
    if (isPlaying && activeSong?._id === song._id) {
      togglePlayPause(false);
    } else {
      playSong(song, queue, i);
      togglePlayPause(true);
    }
  };

  // Mock data for sections not yet connected to API
  const musicGenres = [
    {
      title: 'Rap Tracks',
      subtitle: 'Rap Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/d5d94f00d5699edd472e59e8b2b5e9034cd4b252?width=240',
    },
    {
      title: 'Pop Tracks',
      subtitle: 'Pop Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/a8bead2e755bb337c8ba29ab8698a05422e880dd?width=240',
    },
    {
      title: 'Rock Tracks',
      subtitle: 'Rock Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/fd479bddcecafc8cc90e0e6b2334c41573ac497e?width=240',
    },
    {
      title: 'Classic Tracks',
      subtitle: 'Classic Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/758d27e0fc9a3238cb7722fea5aa58a8b969569d?width=460',
    },
  ];

  const moodPlaylists = [
    {
      title: 'Sad Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/1758cdd337cba9daf2e5d800d44632c9e07a1396?width=240',
    },
    {
      title: 'Workout Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/2e3a508699861848cbdc3f022ef509c06f162640?width=240',
    },
    {
      title: 'Chill Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/b6a6f15179221df07a860151bf8e40eac73fa42e?width=240',
    },
    {
      title: 'Love Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/d7e6bfab257ac684aadefef1a19b6aa714688271?width=360',
    },
    {
      title: 'Happy Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/2fb4c66e9886ada24b6d8349d93db9d4bdad7806?width=360',
    },
  ];

  const popularMusicVideos = [
    {
      title: 'Shake It Off',
      artist: 'Taylor swift',
      views: '4.4M views',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/9fa68de7a69c07d2ca087b6f1318f6229477f231?width=280',
    },
    {
      title: 'Shape Of You',
      artist: 'Ed Sheeran',
      views: '4.2M views',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/5a1f851e73046db590016cf6a95936f4bcca360d?width=280',
    },
    {
      title: 'New Rules',
      artist: 'Dualipa',
      views: '3.7M views',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/3fc5cefe5b4a369197549596db0d8e352617101c?width=280',
    },
    {
      title: 'Someone Like you',
      artist: 'Adele',
      views: '3.5M views',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/1a19d55f7e172dbf3393916c23d5b1a0d6ea5cae?width=280',
    },
    {
      title: 'Lovely',
      artist: 'billie, khalid',
      views: '2.3M views',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/da36a064b565f937b8292fe8ff50553dfa396038?width=280',
    },
    {
      title: 'Waka Waka',
      artist: 'Shakira',
      views: '2.1M views',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/e57ca2a5c66d26f9f0a2f8e699ff87f2a17fdd29?width=280',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#412C3A] to-[#0E1920] text-white px-4 lg:px-6">
      {/* Music Genres Section */}
      <Section title="Music" highlight="Genres" link="/discover/genres">
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
          {musicGenres.map((genre, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 cursor-pointer group hover:scale-105 transition-transform"
            >
              <img
                src={genre.image}
                alt={genre.title}
                className="w-full h-24 lg:h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <div className="absolute bottom-2 left-2">
                  <h4 className="text-white font-bold text-sm lg:text-base">{genre.title}</h4>
                  <p className="text-white/80 text-xs">{genre.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
          <Link
            to="/discover/genres"
            className="hidden lg:flex bg-gray-800 rounded-xl p-4 flex-col items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-semibold text-center">View All</span>
          </Link>
        </div>
      </Section>

      {/* Mood Playlists Section */}
      <Section title="Mood" highlight="Playlist's" link="/discover/playlists">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {moodPlaylists.map((playlist, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-3 lg:p-4 hover:bg-gray-700 transition-colors group cursor-pointer"
            >
              <div className="relative mb-3">
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="w-full h-32 lg:h-40 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Music className="w-4 h-4 text-[#EE10B0]" />
                </div>
              </div>
              <h4 className="font-semibold text-sm lg:text-base">{playlist.title}</h4>
            </div>
          ))}
          <Link
            to="/discover/playlists"
            className="hidden lg:flex bg-gray-800 rounded-xl p-4 flex-col items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-semibold text-center">View All</span>
          </Link>
        </div>
      </Section>

      {/* New Release Songs */}
      <Section title="New Release" highlight="Songs" link="/discover/new-songs">
        {loadingNewSongs ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {newSongs.map((song, i) => (
              <SongCard
                key={song._id}
                song={song}
                queue={newSongs}
                currentSong={activeSong}
                isPlaying={isPlaying}
                onPlayPauseClick={() => handlePlayPauseClick(song, newSongs.items, i)}
              />
            ))}
            <Link
              to="/discover/new-songs"
              className="hidden lg:flex bg-gray-800 rounded-xl p-4 flex-col items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8" />
              </div>
              <span className="font-semibold text-center">View All</span>
            </Link>
          </div>
        )}
      </Section>

      {/* Popular Artists */}
      <Section title="Popular" highlight="Artists" link="/discover/popular-artists">
        {loadingPopularArtists ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {popularArtists.map((artist) => (
              <ArtistCard key={artist._id} item={artist} />
            ))}
            <Link
              to="/discover/popular-artists"
              className="hidden lg:flex bg-gray-800 rounded-xl p-4 flex-col items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8" />
              </div>
              <span className="font-semibold text-center">View All</span>
            </Link>
          </div>
        )}
      </Section>

      {/* Popular Music Video */}
      <Section title="Popular Music" highlight="Video" link="/discover/music-videos">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {popularMusicVideos.map((video, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="relative">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-24 lg:h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm lg:text-base mb-1">{video.title}</h4>
                <p className="text-gray-400 text-xs mb-1">{video.artist}</p>
                <p className="text-gray-400 text-xs opacity-90">{video.views}</p>
              </div>
            </div>
          ))}
          <Link
            to="/discover/music-videos"
            className="hidden lg:flex bg-gray-800 rounded-xl p-4 flex-col items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-semibold text-center">View All</span>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default DiscoverPage;
