import SongCard from '../../components/common/SongCard';
import ArtistCard from '../../components/common/ArtistCard';
import AlbumCard from '../../components/common/AlbumCard';
import VideoCard from '../../components/common/VideoCard';
import PlaylistCard from '../../components/common/PlaylistCard';
import SectionHeader from '../../components/common/SectionHeader';

// Mock Data - Sẽ được thay thế bằng API sau này
const weeklyTopSongs = [
  {
    id: 1,
    title: 'Whatever It Takes',
    artist: { name: 'Imagine Dragons' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/68f77bdbe8edde3f31047312e0d08036de91c404?width=300',
    },
  },
  {
    id: 2,
    title: 'Skyfall',
    artist: { name: 'Adele' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/16d12cee5cb2ec2b0891c1e9a817a59c43b32c59?width=300',
    },
  },
  {
    id: 3,
    title: 'Superman',
    artist: { name: 'Eminem' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/767fce2f3bcdd9df348c16512e18b09e788f3fbd?width=300',
    },
  },
  {
    id: 4,
    title: 'Softcore',
    artist: { name: 'The Neighbourhood' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/fa19e5e8718f2ce7e0dd659041ef1aa781206630?width=300',
    },
  },
  {
    id: 5,
    title: 'The Loneliest',
    artist: { name: 'Måneskin' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/bfb070b2c736c17a7fe297eea7e5eb6e9b920e79?width=300',
    },
  },
];

const newReleaseSongs = [
  {
    id: 1,
    title: 'Time',
    artist: { name: 'Luciano' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/d65eeecfd77137f45154649ed32dc54c74fbef9a?width=300',
    },
  },
  {
    id: 2,
    title: '112',
    artist: { name: 'Jazzek' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/f0398727552f321476d7cb7c05fb4f46365b2e73?width=300',
    },
  },
  {
    id: 3,
    title: "We Don't Care",
    artist: { name: 'Kyanu & Dj Gullum' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/1cdb33fa3dab24d66b317fd141baa82365dc0559?width=300',
    },
  },
  {
    id: 4,
    title: 'Who I Am',
    artist: { name: 'Alan Walker & Elias' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/1215ec26f9ddaa516de44dd162220eaf3e6a05ee?width=300',
    },
  },
  {
    id: 5,
    title: 'Baixo',
    artist: { name: 'XXAnteria' },
    album: {
      cover_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/1422e957e3523f738b5a75d1a2f184a39a1cbe48?width=300',
    },
  },
];

const popularArtists = [
  {
    id: 1,
    name: 'Eminem',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/e89457ca461de5d776fb4dbdae415ea40964bfe5?width=260',
  },
  {
    id: 2,
    name: 'Imagine Dragons',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/39cde41f1f7538dcfb1e4aee49765e2f18698bbd?width=260',
  },
  {
    id: 3,
    name: 'Adele',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9018adc1a5f8f20c3085f160e7cf5c6a184e422c?width=260',
  },
  {
    id: 4,
    name: 'Lana Del Rey',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/8f61ee01e0769db95b1bd34d6c97f62ea16c0cd9?width=260',
  },
  {
    id: 5,
    name: 'Harry Styles',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4a24a7a7fb4a2e50a3efb8ace986d81e7d3a7f7e?width=260',
  },
  {
    id: 6,
    name: 'Billie Eilish',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/3527dbd3220636d6907a550c8a6de95784419396?width=260',
  },
];

const musicVideos = [
  {
    id: 1,
    title: 'Gossip',
    artist: { name: 'Måneskin' },
    views: '231K views',
    thumbnail:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/1ff4019974ea2355c3749dfd7de027d9f6fa9081?width=600',
  },
  {
    id: 2,
    title: 'Shape Of You',
    artist: { name: 'Ed Sheeran' },
    views: '5M views',
    thumbnail:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/d7293d68072f89191d3efb1c9203a8dc78d0a703?width=600',
  },
  {
    id: 3,
    title: 'Someone Like You',
    artist: { name: 'Adele' },
    views: '3M views',
    thumbnail:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/516d7870780b025509ba83ec8f045f14f0255637?width=600',
  },
];

const topAlbums = [
  {
    id: 1,
    title: 'Adele 21',
    artist: { name: 'Adele' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/7e9f955a8151235b845bd7cae07ffb43f122bbe3?width=360',
  },
  {
    id: 2,
    title: 'Beauty Behind the Madness',
    artist: { name: 'The Weeknd' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/8cb93b77c1faa2b3353dc95df7c1df2a9fc92463?width=360',
  },
  {
    id: 3,
    title: 'Scorpion',
    artist: { name: 'Drake' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/811512bcc2919ecbe950dcce95d9e4b0d20696f1?width=360',
  },
  {
    id: 4,
    title: "Harry's House",
    artist: { name: 'Harry Styles' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f283a1cb2c771b3a2938f34a13b2934edb1566c9?width=360',
  },
  {
    id: 5,
    title: 'Born To Die',
    artist: { name: 'Lana Del Rey' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/675f184dd0d9a265b777b8c9836238b7226ce18a?width=360',
  },
];

const moodPlaylists = [
  {
    id: 1,
    title: 'Sad Playlist',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/fab525f0e5c672ac1c9c8bcb85fcb6bb9ebe6302?width=360',
  },
  {
    id: 2,
    title: 'Chill Playlist',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/57dcf3a948bc3ed95f193bd20fa0117718cf2913?width=360',
  },
  {
    id: 3,
    title: 'Workout Songs',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f98ad187ec5bf80de0be22631035625f66f87252?width=360',
  },
  {
    id: 4,
    title: 'Love Playlist',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/03f99f35ed5c4be974e0bb65bbff61c13f7d53e0?width=360',
  },
  {
    id: 5,
    title: 'Happy Songs',
    picture_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/efbc4f7ba91e1c82bd6a419e9a9e257d661c501c?width=360',
  },
];

const HomePage = () => {
  return (
    <div className="text-white font-vazirmatn space-y-12 lg:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative">
        <div
          className="relative bg-cover bg-center rounded-lg overflow-hidden h-[300px] lg:h-[344px]"
          style={{
            backgroundImage:
              "url('https://cdn.builder.io/api/v1/image/assets/TEMP/540d26a33f5afda822cf549b2a6f8471c7ef8ae6?width=1802')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-between">
            <div>
              <h1 className="text-white text-[28px] lg:text-[32px] font-bold mb-4">
                Billie Eilish
              </h1>
              <p className="text-white text-[14px] lg:text-[16px] leading-relaxed max-w-[280px]">
                You can have easy access to every song of billie eilish by just clicking on the{' '}
                <span className="text-[#EE10B0]">Listen now</span> button. You can also{' '}
                <span className="text-[#0E9EEF]">follow</span> him too for supporting him and
                keeping it up with what he does.
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="border-2 border-[#EE10B0] text-[#EE10B0] px-6 py-2 rounded-lg hover:bg-[#EE10B0] hover:text-white transition-colors">
                Listen Now
              </button>
              <button className="border-2 border-[#0E9EEF] text-[#0E9EEF] px-6 py-2 rounded-lg hover:bg-[#0E9EEF] hover:text-white transition-colors">
                Follow
              </button>
            </div>
          </div>
          {/* Navigation Dots */}
          <div className="absolute bottom-4 right-8 flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === 4 ? 'bg-[#EE10B0]' : 'bg-black opacity-50'}`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Top Songs */}
      <section>
        <SectionHeader title="Weekly Top" coloredText="Songs" />
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {weeklyTopSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* New Release Songs */}
      <section>
        <SectionHeader title="New Release" coloredText="Songs" />
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {newReleaseSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* Trending Songs */}
      <section>
        <SectionHeader title="Trending" coloredText="Songs" showViewAll={false} />
        {/* Table will be a separate component */}
      </section>

      {/* Popular Artists */}
      <section>
        <SectionHeader title="Popular" coloredText="Artists" />
        <div className="flex space-x-4 lg:space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          {popularArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Music Videos */}
      <section>
        <SectionHeader title="Music" coloredText="Video" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {musicVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* Top Albums */}
      <section>
        <SectionHeader title="Top" coloredText="Albums" />
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {topAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Mood Playlists */}
      <section>
        <SectionHeader title="Mood" coloredText="Playlists" />
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {moodPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* Join Platform Section */}
      <section className="bg-gradient-to-r from-[#412C3A] to-[#0E1920] rounded-lg p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-white text-[32px] lg:text-[40px] font-black mb-4">
              Join Our Platform
            </h2>
            <p className="text-white text-[16px] lg:text-[20px] leading-relaxed">
              You can be one of the <span className="text-[#EE10B0]">members</span> of our platform
              by just adding some necessary information. If you already have an account on our
              website, you can just hit the <span className="text-[#0E9EEF]">Login button</span>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-end">
            <button className="bg-[#1E1E1E] border border-[#EE10B0] text-[#EE10B0] px-8 py-3 rounded-lg text-[20px] lg:text-[24px] font-semibold hover:bg-[#EE10B0] hover:text-black transition-colors">
              Login
            </button>
            <button className="bg-[#EE10B0] text-black px-8 py-3 rounded-lg text-[20px] lg:text-[24px] font-semibold hover:bg-[#d90e9b] transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
