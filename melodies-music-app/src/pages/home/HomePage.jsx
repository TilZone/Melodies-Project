import { Link } from 'react-router-dom';
import { Play, Heart, Plus, Music } from 'lucide-react';
import useDiscoverData from '../../hooks/useDiscoverData';
import { usePlayerStore } from '../../store/usePlayerStore';
import SongCard from '../../components/common/SongCard';
import ArtistCard from '../../components/common/ArtistCard';
import Section from '../../components/common/Section';
import { Skeleton } from '../../components/ui/skeleton';

const HomePage = () => {
  const { newSongs, popularArtists, loadingNewSongs, loadingPopularArtists } = useDiscoverData();
  const { activeSong, isPlaying, togglePlayPause, playSong } = usePlayerStore();

  const handlePlayPauseClick = (song, i) => {
    if (isPlaying && activeSong?.title === song.title) {
      togglePlayPause(false);
    } else {
      playSong(song, newSongs, i);
      togglePlayPause(true);
    }
  };

  // Mock data for sections not yet connected to API
  const weeklyTopSongs = [
    {
      title: 'Whatever It Takes',
      artist: 'Imagine Dragons',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/b15d6649f1c342f4211d0e212a921c4110d89825?width=300',
    },
    {
      title: 'Skyfall',
      artist: 'Adele',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/66c97a7c9cfff01f05bdf33f93e66b5823466d36?width=300',
    },
    {
      title: 'Superman',
      artist: 'Eminem',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/990c2ffc4c9b743e299150b7e301445e6c4a212f?width=300',
    },
    {
      title: 'Softcore',
      artist: 'The Neighbourhood',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/c894983b70a9008d73073af125672fe60c5539cd?width=300',
    },
    {
      title: 'The Loneliest',
      artist: 'Måneskin',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/5b1bdf85da2265d7b3533b5ec01fe74c30c36b19?width=300',
    },
  ];

  const trendingSongs = [
    {
      rank: '#1',
      title: 'Softcore',
      artist: 'The Neighbourhood',
      date: 'Nov 4, 2023',
      album: 'Hard to Imagine the Neighbourhood Ever Changing',
      time: '3:26',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/e70ecbfef7aac377b79cd93e7a5b0687d53c0aaf?width=120',
    },
    {
      rank: '#2',
      title: 'Skyfall Beats',
      artist: 'Nightmares',
      date: 'Oct 26, 2023',
      album: 'Nightmares',
      time: '2:45',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/519398d9a51529be8e4deb59305fb21f27fb921c?width=120',
    },
    {
      rank: '#3',
      title: 'Greedy',
      artist: 'Tate McRae',
      date: 'Dec 30, 2023',
      album: 'Greedy',
      time: '2:11',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/3bb6e1393e9a278b88029dc44a0de5ccda04ad8f?width=120',
    },
    {
      rank: '#4',
      title: 'Lovin On me',
      artist: 'Jack Harlow',
      date: 'Dec 30, 2023',
      album: 'Lovin On me',
      time: '2:18',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/c0c626cc2ebd4f33fe8a07c58166362144068980?width=120',
    },
    {
      rank: '#5',
      title: 'Paint the town red',
      artist: 'Doja Cat',
      date: 'Dec 29, 2023',
      album: 'Paint The Town Red',
      time: '3:51',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/e22d8f90160a96cd960697c75783e932c9b1334b?width=120',
    },
    {
      rank: '#6',
      title: 'Dancin On Night',
      artist: 'Dualipa',
      date: 'May 27, 2023',
      album: 'Dance The Night(From Barbie Movie)',
      time: '2:56',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/0751d870ab17e482eaf79ec0d954ccbec38b6ad6?width=120',
    },
    {
      rank: '#7',
      title: 'Water',
      artist: 'Tyla',
      date: 'Dec 10, 2023',
      album: 'Water',
      time: '3:20',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/223897eea9b8d34f85998db0b94a3ba5f88129e8?width=120',
    },
  ];

  const musicVideos = [
    {
      title: 'Gossip',
      artist: 'Måneskin',
      views: '231K views',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/3b576282e1adf28f0617f211bf2e29ed8618bdf8?width=600',
    },
    {
      title: 'Shape Of You',
      artist: 'Ed Sheeran',
      views: '5M views',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/7c380dc0c7a35e3d6e871c7e21f367d66cb091dc?width=600',
    },
    {
      title: 'Someone Like You',
      artist: 'Adele',
      views: '3M views',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/0a712c99e78eb538cd8d5b329d6d16bc700dd741?width=600',
    },
  ];

  const topAlbums = [
    {
      title: 'Adele 21',
      artist: 'Adele',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/d2836b3e3c55767f9276446f97b48df2fdd52017?width=360',
    },
    {
      title: 'Beauty Behind the Madness 21',
      artist: 'The Weekend',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/82b39239aa6b47b9e12d9650ceb598a858ba82a4?width=360',
    },
    {
      title: 'Scorpion',
      artist: 'Drake',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/f0cde672aa00835b4d36ba763b01cebc1b26de39?width=360',
    },
    {
      title: "Harry's House",
      artist: 'Harry Styles',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/6462db30c124c9abbd3498ef163c591f320e77d7?width=360',
    },
    {
      title: 'Born To Die',
      artist: 'Lana Del Ray',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/3b5dea9d5aac4ea03b4240f8d3d576aa5a7480c6?width=360',
    },
  ];

  const moodPlaylists = [
    {
      title: 'Sad Playlist',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/6ac21ed9b72f55812a9bec567ce9de7d026d19d4?width=360',
    },
    {
      title: 'Chill Playlist',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/4ce9e287c68ed77c46619062aee9e6fb6816f6e6?width=360',
    },
    {
      title: 'Workout Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/0215f4dedc1587ac05b929c6ccc0c524d5aac061?width=360',
    },
    {
      title: 'Love Playlist',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/90a3b7b85ad3a8cb45f9973892f12d0d37364d35?width=360',
    },
    {
      title: 'Happy Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/5bf4e938ca7550d0188f8542f051fcaaa3927596?width=360',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#412C3A] to-[#0E1920] text-white px-6">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="relative bg-gradient-to-r from-[#412C3A] to-[#0E1920] rounded-xl overflow-hidden">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1945f522bae5508ac992d38a9f99ae9d727e804f?width=1802"
            alt="Billie Eilish"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
            <div className="p-8 h-full flex flex-col justify-center max-w-md">
              <h2 className="text-4xl font-bold mb-4">Billie eilish</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                You can have easy access to every song of billie eilish by just clicking on the{' '}
                <span className="text-[#EE10B0]">Listen now</span> button. You can also{' '}
                <span className="text-[#0E9EEF]">follow</span> him too for supporting him and
                keeping it up with what he does.
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-3 border-2 border-[#EE10B0] text-[#EE10B0] rounded-lg hover:bg-[#EE10B0] hover:text-black transition-colors">
                  Listen Now
                </button>
                <button className="px-6 py-3 border-2 border-[#0E9EEF] text-[#0E9EEF] rounded-lg hover:bg-[#0E9EEF] hover:text-black transition-colors">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Top Songs */}
      <Section title="Weekly Top" highlight="Songs" link="/home/weekly-top">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {weeklyTopSongs.map((song, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors group cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Music className="w-4 h-4 text-[#EE10B0]" />
                </div>
              </div>
              <h4 className="font-semibold mb-1">{song.title}</h4>
              <p className="text-gray-400 text-sm">{song.artist}</p>
            </div>
          ))}
          <Link
            to="/home/weekly-top"
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
      <Section title="New Release" highlight="Songs" link="/home/new-releases">
        {loadingNewSongs ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {newSongs.map((song, i) => (
              <SongCard
                key={song._id}
                song={song}
                queue={newSongs}
                currentSong={activeSong}
                isPlaying={isPlaying}
                onPlayPauseClick={() => handlePlayPauseClick(song, i)}
              />
            ))}
            <Link
              to="/home/new-releases"
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

      {/* Trending Songs */}
      <Section title="Trending" highlight="Songs" link="/home/trending">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="grid grid-cols-4 gap-4 text-gray-400 text-sm mb-4 px-4">
            <div></div>
            <div>Release Date</div>
            <div>Album</div>
            <div>Time</div>
          </div>
          {trendingSongs.map((song, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg p-4 grid grid-cols-4 gap-4 items-center hover:bg-gray-600 transition-colors mb-2"
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold">{song.rank}</span>
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold">{song.title}</h4>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
              </div>
              <div className="text-sm">{song.date}</div>
              <div className="text-sm">{song.album}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{song.time}</span>
                <Heart className="w-5 h-5 text-[#EE10B0]" />
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-6">
            <Link
              to="/home/trending"
              className="flex items-center space-x-2 bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">View All</span>
            </Link>
          </div>
        </div>
      </Section>

      {/* Popular Artists */}
      <Section title="Popular" highlight="Artists" link="/home/popular-artists">
        {loadingPopularArtists ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {popularArtists.map((artist) => (
              <ArtistCard key={artist._id} item={artist} />
            ))}
            <Link
              to="/home/popular-artists"
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

      {/* Music Videos */}
      <Section title="Music" highlight="Videos" link="/home/music-videos">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {musicVideos.map((video, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="relative">
                <img src={video.image} alt={video.title} className="w-full h-32 object-cover" />
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
            to="/home/music-videos"
            className="hidden lg:flex bg-gray-800 rounded-xl p-4 flex-col items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-semibold text-center">View All</span>
          </Link>
        </div>
      </Section>

      {/* Top Albums */}
      <Section title="Top" highlight="Albums" link="/home/top-albums">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {topAlbums.map((album, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors group cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Music className="w-4 h-4 text-[#0E9EEF]" />
                </div>
              </div>
              <h4 className="font-semibold mb-1">{album.title}</h4>
              <p className="text-gray-400 text-sm">{album.artist}</p>
            </div>
          ))}
          <Link
            to="/home/top-albums"
            className="hidden lg:flex bg-gray-800 rounded-xl p-4 flex-col items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-semibold text-center">View All</span>
          </Link>
        </div>
      </Section>

      {/* Mood Playlists */}
      <Section title="Mood" highlight="Playlists" link="/home/mood-playlists">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {moodPlaylists.map((playlist, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors group cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Music className="w-4 h-4 text-[#EE10B0]" />
                </div>
              </div>
              <h4 className="font-semibold">{playlist.title}</h4>
            </div>
          ))}
          <Link
            to="/home/mood-playlists"
            className="hidden lg:flex bg-gray-800 rounded-xl p-4 flex-col items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-semibold text-center">View All</span>
          </Link>
        </div>
      </Section>

      {/* Join Platform Section */}
      <div className="px-6 mb-12">
        <div className="bg-gradient-to-r from-[#412C3A] to-[#0E1920] rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h3 className="text-4xl font-bold mb-4">Join Our Platform</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                You can be one of the <span className="text-[#EE10B0]">members</span> of our
                platform by just adding some necessary information. If you already have an account
                on our website, you can just hit the{' '}
                <span className="text-[#0E9EEF]">Login button</span>.
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="px-8 py-3 bg-gray-800 border border-[#EE10B0] rounded-lg text-[#EE10B0] font-semibold hover:bg-[#EE10B0] hover:text-black transition-colors">
                Login
              </button>
              <button className="px-8 py-3 bg-[#EE10B0] rounded-lg text-black font-semibold hover:bg-[#EE10B0]/90 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
