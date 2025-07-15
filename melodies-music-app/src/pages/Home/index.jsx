import {
  SearchOutlined,
  MenuOutlined,
  HeartOutlined,
  PlayCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';

const Home = () => {
  const weeklyTopSongs = [
    {
      id: 1,
      title: 'Whatever It Takes',
      artist: 'Imagine Dragons',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/68f77bdbe8edde3f31047312e0d08036de91c404?width=300',
    },
    {
      id: 2,
      title: 'Skyfall',
      artist: 'Adele',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/16d12cee5cb2ec2b0891c1e9a817a59c43b32c59?width=300',
    },
    {
      id: 3,
      title: 'Superman',
      artist: 'Eminem',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/767fce2f3bcdd9df348c16512e18b09e788f3fbd?width=300',
    },
    {
      id: 4,
      title: 'Softcore',
      artist: 'The Neighbourhood',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/fa19e5e8718f2ce7e0dd659041ef1aa781206630?width=300',
    },
    {
      id: 5,
      title: 'The Loneliest',
      artist: 'Måneskin',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/bfb070b2c736c17a7fe297eea7e5eb6e9b920e79?width=300',
    },
  ];

  const newReleaseSongs = [
    {
      id: 1,
      title: 'Time',
      artist: 'Luciano',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/d65eeecfd77137f45154649ed32dc54c74fbef9a?width=300',
    },
    {
      id: 2,
      title: '112',
      artist: 'Jazzek',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/f0398727552f321476d7cb7c05fb4f46365b2e73?width=300',
    },
    {
      id: 3,
      title: "We Don't Care",
      artist: 'Kyanu & Dj Gullum',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/1cdb33fa3dab24d66b317fd141baa82365dc0559?width=300',
    },
    {
      id: 4,
      title: 'Who I Am',
      artist: 'Alan Walker & Elias',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/1215ec26f9ddaa516de44dd162220eaf3e6a05ee?width=300',
    },
    {
      id: 5,
      title: 'Baixo',
      artist: 'XXAnteria',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/1422e957e3523f738b5a75d1a2f184a39a1cbe48?width=300',
    },
  ];

  const trendingSongs = [
    {
      rank: 1,
      title: 'Softcore',
      artist: 'The Neighbourhood',
      album: 'Hard to Imagine the Neighbourhood Ever Changing',
      releaseDate: 'Nov 4, 2023',
      duration: '3:26',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/64c8efd0e3396704018e71128b1ac8c1ff368b65?width=120',
    },
    {
      rank: 2,
      title: 'Skyfall Beats',
      artist: 'Nightmares',
      album: 'nightmares',
      releaseDate: 'Oct 26, 2023',
      duration: '2:45',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/aada800e9922b95681a476a46e7ddca27e397de6?width=120',
    },
    {
      rank: 3,
      title: 'Greedy',
      artist: 'Tate McRae',
      album: 'Greedy',
      releaseDate: 'Dec 30, 2023',
      duration: '2:11',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/de4a75940b2f39dd19c5cf6d8f31f9c4db07003f?width=120',
    },
    {
      rank: 4,
      title: 'Lovin On Me',
      artist: 'Jack Harlow',
      album: 'Lovin On Me',
      releaseDate: 'Dec 30, 2023',
      duration: '2:18',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/51b642539c6b0f40867570c7d5bdd56a10511543?width=120',
    },
    {
      rank: 5,
      title: 'Paint The Town Red',
      artist: 'Doja Cat',
      album: 'Paint The Town Red',
      releaseDate: 'Dec 29, 2023',
      duration: '3:51',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/51218c62dafda2097de811c8fbe779ec7bda90ac?width=120',
    },
    {
      rank: 6,
      title: 'Dancin On Night',
      artist: 'Dua Lipa',
      album: 'Dance The Night(From Barbie Movie)',
      releaseDate: 'May 27, 2023',
      duration: '2:56',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/7872daa0c1eee7b34e2d6ce08caed056e9684586?width=120',
    },
    {
      rank: 7,
      title: 'Water',
      artist: 'Tyla',
      album: 'Water',
      releaseDate: 'Dec 10, 2023',
      duration: '3:20',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/b67f61f2fb03fc736b4109524efafe21f22b9e25?width=120',
    },
  ];

  const popularArtists = [
    {
      name: 'Eminem',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/e89457ca461de5d776fb4dbdae415ea40964bfe5?width=260',
    },
    {
      name: 'Imagine Dragons',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/39cde41f1f7538dcfb1e4aee49765e2f18698bbd?width=260',
    },
    {
      name: 'Adele',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/9018adc1a5f8f20c3085f160e7cf5c6a184e422c?width=260',
    },
    {
      name: 'Lana Del Rey',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/8f61ee01e0769db95b1bd34d6c97f62ea16c0cd9?width=260',
    },
    {
      name: 'Harry Styles',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/4a24a7a7fb4a2e50a3efb8ace986d81e7d3a7f7e?width=260',
    },
    {
      name: 'Billie Eilish',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/3527dbd3220636d6907a550c8a6de95784419396?width=260',
    },
  ];

  const musicVideos = [
    {
      title: 'Gossip',
      artist: 'Måneskin',
      views: '231K views',
      thumbnail:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/1ff4019974ea2355c3749dfd7de027d9f6fa9081?width=600',
    },
    {
      title: 'Shape Of You',
      artist: 'Ed Sheeran',
      views: '5M views',
      thumbnail:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/d7293d68072f89191d3efb1c9203a8dc78d0a703?width=600',
    },
    {
      title: 'Someone Like You',
      artist: 'Adele',
      views: '3M views',
      thumbnail:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/516d7870780b025509ba83ec8f045f14f0255637?width=600',
    },
  ];

  const topAlbums = [
    {
      title: 'Adele 21',
      artist: 'Adele',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/7e9f955a8151235b845bd7cae07ffb43f122bbe3?width=360',
    },
    {
      title: 'Beauty Behind the Madness',
      artist: 'The Weeknd',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/8cb93b77c1faa2b3353dc95df7c1df2a9fc92463?width=360',
    },
    {
      title: 'Scorpion',
      artist: 'Drake',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/811512bcc2919ecbe950dcce95d9e4b0d20696f1?width=360',
    },
    {
      title: "Harry's House",
      artist: 'Harry Styles',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/f283a1cb2c771b3a2938f34a13b2934edb1566c9?width=360',
    },
    {
      title: 'Born To Die',
      artist: 'Lana Del Rey',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/675f184dd0d9a265b777b8c9836238b7226ce18a?width=360',
    },
  ];

  const moodPlaylists = [
    {
      title: 'Sad Playlist',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/fab525f0e5c672ac1c9c8bcb85fcb6bb9ebe6302?width=360',
    },
    {
      title: 'Chill Playlist',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/57dcf3a948bc3ed95f193bd20fa0117718cf2913?width=360',
    },
    {
      title: 'Workout Songs',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/f98ad187ec5bf80de0be22631035625f66f87252?width=360',
    },
    {
      title: 'Love Playlist',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/03f99f35ed5c4be974e0bb65bbff61c13f7d53e0?width=360',
    },
    {
      title: 'Happy Songs',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/efbc4f7ba91e1c82bd6a419e9a9e257d661c501c?width=360',
    },
  ];

  const SongCard = ({ song, showArtist = true }) => (
    <div className="bg-[#1F1F1F] rounded-lg p-4 min-w-[180px] hover:bg-[#2A2A2A] transition-colors cursor-pointer">
      <div className="relative mb-3">
        <img
          src={song.image}
          alt={song.title}
          className="w-full h-[150px] object-cover rounded-lg"
        />
        <div className="absolute bottom-2 right-2">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M13.125 1.875V9.6875C13.125 10.2677 12.8945 10.8241 12.4843 11.2343C12.0741 11.6445 11.5177 11.875 10.9375 11.875C10.3573 11.875 9.80094 11.6445 9.3907 11.2343C8.98047 10.8241 8.75 10.2677 8.75 9.6875C8.75 9.10734 8.98047 8.55094 9.3907 8.1407C9.80094 7.73047 10.3573 7.5 10.9375 7.5C11.275 7.5 11.5938 7.575 11.875 7.7125V4.04375L5.625 5.375V10.9375C5.625 11.5177 5.39453 12.0741 4.9843 12.4843C4.57406 12.8945 4.01766 13.125 3.4375 13.125C2.85734 13.125 2.30094 12.8945 1.8907 12.4843C1.48047 12.0741 1.25 11.5177 1.25 10.9375C1.25 10.3573 1.48047 9.80094 1.8907 9.3907C2.30094 8.98047 2.85734 8.75 3.4375 8.75C3.775 8.75 4.09375 8.825 4.375 8.9625V3.75L13.125 1.875Z"
              fill="#EE10B0"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-white font-medium text-[16px] leading-[25px] font-vazirmatn">
        {song.title}
      </h3>
      {showArtist && (
        <p className="text-white opacity-80 text-[12px] leading-[19px] font-vazirmatn font-light mt-1">
          {song.artist}
        </p>
      )}
    </div>
  );

  const ViewAllButton = () => (
    <div className="flex flex-col items-center justify-center min-w-[80px]">
      <div className="w-[62px] h-[62px] bg-[#1E1E1E] rounded-full flex items-center justify-center mb-2">
        <span className="text-white text-[40px] font-bold">+</span>
      </div>
      <span className="text-white text-[20px] font-semibold font-vazirmatn text-center">
        View All
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#412C3A] text-white font-vazirmatn">
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-20 py-4 lg:py-6">
        {/* Logo */}
        <div className="text-[32px] lg:text-[40px] font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent">
          Melodies
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden lg:flex items-center bg-[#656565] rounded-lg px-4 py-2 w-[359px]">
          <SearchOutlined className="text-white opacity-60 mr-3" />
          <span className="text-white opacity-60 text-[16px]">
            Search For Musics, Artists, Albums ...
          </span>
        </div>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-8">
          <span className="text-white text-[24px] font-semibold cursor-pointer hover:text-[#EE10B0] transition-colors">
            About
          </span>
          <span className="text-white text-[24px] font-semibold cursor-pointer hover:text-[#EE10B0] transition-colors">
            Contact
          </span>
          <span className="text-white text-[24px] font-semibold cursor-pointer hover:text-[#EE10B0] transition-colors">
            Premium
          </span>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#1E1E1E] border border-[#EE10B0] text-[#EE10B0] px-6 py-2 rounded-lg text-[16px] lg:text-[20px] font-semibold hover:bg-[#EE10B0] hover:text-black transition-colors">
            Login
          </button>
          <button className="bg-[#EE10B0] text-black px-6 py-2 rounded-lg text-[16px] lg:text-[20px] font-semibold hover:bg-[#d90e9b] transition-colors">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <MenuOutlined className="lg:hidden text-[#EE10B0] text-[24px]" />
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-20 py-8 lg:py-12">
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

      <div className="px-6 lg:px-20 space-y-12 lg:space-y-16 pb-16">
        {/* Weekly Top Songs */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] lg:text-[32px] font-bold">
              Weekly Top <span className="text-[#EE10B0]">Songs</span>
            </h2>
            <div className="flex items-center space-x-2 text-[#0E9EEF] cursor-pointer">
              <span className="text-[14px] lg:text-[16px]">View All</span>
              <RightOutlined className="text-[12px]" />
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {weeklyTopSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
            <ViewAllButton />
          </div>
        </section>

        {/* New Release Songs */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] lg:text-[32px] font-bold">
              New Release <span className="text-[#EE10B0]">Songs</span>
            </h2>
            <div className="flex items-center space-x-2 text-[#0E9EEF] cursor-pointer">
              <span className="text-[14px] lg:text-[16px]">View All</span>
              <RightOutlined className="text-[12px]" />
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {newReleaseSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
            <ViewAllButton />
          </div>
        </section>

        {/* Trending Songs */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] lg:text-[32px] font-bold">
              Trending <span className="text-[#EE10B0]">Songs</span>
            </h2>
          </div>

          {/* Table Header - Hidden on mobile */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-2 text-white text-[16px] lg:text-[20px] mb-4">
            <div className="col-span-1"></div>
            <div className="col-span-4"></div>
            <div className="col-span-3">Release Date</div>
            <div className="col-span-3">Album</div>
            <div className="col-span-1">Time</div>
          </div>

          <div className="space-y-2">
            {trendingSongs.map((song) => (
              <div
                key={song.rank}
                className="bg-[#1E1E1E] rounded-md p-3 lg:p-4 flex lg:grid lg:grid-cols-12 lg:gap-4 items-center hover:bg-[#2A2A2A] transition-colors cursor-pointer"
              >
                <div className="lg:col-span-1 text-white text-[20px] lg:text-[24px] font-semibold mr-4 lg:mr-0">
                  #{song.rank}
                </div>
                <div className="lg:col-span-4 flex items-center space-x-3 flex-1 lg:flex-none">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-12 h-12 lg:w-[60px] lg:h-[60px] rounded object-cover"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-[16px] lg:text-[20px]">
                      {song.title}
                    </h3>
                    <p className="text-white opacity-80 text-[12px]">{song.artist}</p>
                  </div>
                </div>
                <div className="hidden lg:block lg:col-span-3 text-white text-[16px]">
                  {song.releaseDate}
                </div>
                <div className="hidden lg:block lg:col-span-3 text-white text-[16px]">
                  {song.album}
                </div>
                <div className="lg:col-span-1 flex items-center space-x-2">
                  <span className="text-white text-[14px] lg:text-[16px]">{song.duration}</span>
                  <HeartOutlined className="text-[#EE10B0] text-[16px] lg:text-[20px]" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-[#1E1E1E] text-white px-8 py-3 rounded-md flex items-center space-x-2 hover:bg-[#2A2A2A] transition-colors">
              <span className="text-[32px] font-bold">+</span>
              <span className="text-[20px] lg:text-[24px] font-semibold">View All</span>
            </button>
          </div>
        </section>

        {/* Popular Artists */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] lg:text-[32px] font-bold">
              Popular <span className="text-[#EE10B0]">Artists</span>
            </h2>
            <div className="flex items-center space-x-2 text-[#0E9EEF] cursor-pointer">
              <span className="text-[14px] lg:text-[16px]">View All</span>
              <RightOutlined className="text-[12px]" />
            </div>
          </div>
          <div className="flex space-x-4 lg:space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {popularArtists.map((artist, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[120px] lg:min-w-[130px] cursor-pointer hover:transform hover:scale-105 transition-transform"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-[120px] h-[120px] lg:w-[130px] lg:h-[130px] rounded-full object-cover mb-3"
                />
                <span className="text-white text-[16px] lg:text-[20px] font-semibold text-center">
                  {artist.name}
                </span>
              </div>
            ))}
            <ViewAllButton />
          </div>
        </section>

        {/* Music Videos */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] lg:text-[32px] font-bold">
              Music <span className="text-[#EE10B0]">Video</span>
            </h2>
            <div className="flex items-center space-x-2 text-[#0E9EEF] cursor-pointer">
              <span className="text-[14px] lg:text-[16px]">View All</span>
              <RightOutlined className="text-[12px]" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {musicVideos.map((video, index) => (
              <div
                key={index}
                className="bg-[#1F1F1F] rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-transform"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-[200px] lg:h-[169px] object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircleOutlined className="text-white text-[48px] opacity-80" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-[20px] lg:text-[24px] mb-1">
                    {video.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-white opacity-80 text-[12px]">{video.artist}</p>
                    <p className="text-white opacity-80 text-[12px]">{video.views}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Albums */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] lg:text-[32px] font-bold">
              Top <span className="text-[#0E9EEF]">Albums</span>
            </h2>
            <div className="flex items-center space-x-2 text-[#0E9EEF] cursor-pointer">
              <span className="text-[14px] lg:text-[16px]">View All</span>
              <RightOutlined className="text-[12px]" />
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {topAlbums.map((album, index) => (
              <div
                key={index}
                className="bg-[#1F1F1F] rounded-lg p-4 min-w-[180px] cursor-pointer hover:bg-[#2A2A2A] transition-colors"
              >
                <div className="relative mb-3">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-[150px] object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M7.5 9.6875C8.11292 9.6875 8.63083 9.47625 9.05375 9.05375C9.47625 8.63042 9.6875 8.1125 9.6875 7.5C9.6875 6.88708 9.47625 6.36917 9.05375 5.94625C8.63042 5.52375 8.1125 5.3125 7.5 5.3125C6.88708 5.3125 6.36917 5.52375 5.94625 5.94625C5.52375 6.36958 5.3125 6.8875 5.3125 7.5C5.3125 8.11292 5.52375 8.63083 5.94625 9.05375C6.36958 9.47625 6.8875 9.6875 7.5 9.6875Z"
                        fill="#0E9EEF"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-white font-medium text-[16px] mb-1">{album.title}</h3>
                <p className="text-white opacity-80 text-[12px]">{album.artist}</p>
              </div>
            ))}
            <ViewAllButton />
          </div>
        </section>

        {/* Mood Playlists */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] lg:text-[32px] font-bold">
              Mood <span className="text-[#EE10B0]">Playlists</span>
            </h2>
            <div className="flex items-center space-x-2 text-[#0E9EEF] cursor-pointer">
              <span className="text-[14px] lg:text-[16px]">View All</span>
              <RightOutlined className="text-[12px]" />
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {moodPlaylists.map((playlist, index) => (
              <div
                key={index}
                className="bg-[#1F1F1F] rounded-lg p-4 min-w-[180px] cursor-pointer hover:bg-[#2A2A2A] transition-colors"
              >
                <div className="relative mb-3">
                  <img
                    src={playlist.image}
                    alt={playlist.title}
                    className="w-full h-[150px] object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M1.875 3.75C1.875 3.62568 1.92439 3.50645 2.01229 3.41854C2.1002 3.33064 2.21943 3.28125 2.34375 3.28125H12.6562C12.7806 3.28125 12.8998 3.33064 12.9877 3.41854C13.0756 3.50645 13.125 3.62568 13.125 3.75C13.125 3.87432 13.0756 3.99355 12.9877 4.08146C12.8998 4.16936 12.7806 4.21875 12.6562 4.21875H2.34375C2.21943 4.21875 2.1002 4.16936 2.01229 4.08146C1.92439 3.99355 1.875 3.87432 1.875 3.75Z"
                        fill="#EE10B0"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-white font-medium text-[16px]">{playlist.title}</h3>
              </div>
            ))}
            <ViewAllButton />
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
                You can be one of the <span className="text-[#EE10B0]">members</span> of our
                platform by just adding some necessary information. If you already have an account
                on our website, you can just hit the{' '}
                <span className="text-[#0E9EEF]">Login button</span>.
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

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#69425C] via-[#533248] to-[#412C3A] px-6 lg:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-[32px] lg:text-[40px] font-black mb-4">About</h3>
            <p className="text-white text-[16px] lg:text-[20px] font-semibold leading-relaxed opacity-90">
              Melodies is a website that has been created for over{' '}
              <span className="text-[#EE10B0]">5 years</span> now and it is one of the most famous
              music player websites in the world. In this website you can listen and download songs
              for free. Also if you want no limitation you can buy our{' '}
              <span className="text-[#0E9EEF]">premium passes</span>.
            </p>
          </div>

          {/* Melodi Section */}
          <div>
            <h3 className="text-white text-[32px] lg:text-[36px] font-bold mb-4">Melodi</h3>
            <div className="space-y-3">
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Songs
              </p>
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Radio
              </p>
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Podcast
              </p>
            </div>
          </div>

          {/* Access Section */}
          <div>
            <h3 className="text-white text-[32px] lg:text-[36px] font-bold mb-4">Access</h3>
            <div className="space-y-3">
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Explore
              </p>
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Artists
              </p>
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Playlists
              </p>
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Albums
              </p>
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Trending
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-[32px] lg:text-[36px] font-bold mb-4">Contact</h3>
            <div className="space-y-3 mb-6">
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                About
              </p>
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Policy
              </p>
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Social Media
              </p>
              <p className="text-white text-[20px] lg:text-[24px] font-medium cursor-pointer hover:text-[#EE10B0] transition-colors">
                Support
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <div className="w-[45px] h-[45px] bg-[#412C3A] rounded border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#412C3A] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="w-[45px] h-[45px] bg-[#412C3A] rounded border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#412C3A] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="w-[45px] h-[45px] bg-[#412C3A] rounded border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#412C3A] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
              <div className="w-[45px] h-[45px] bg-[#412C3A] rounded border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#412C3A] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Logo */}
        <div className="text-center lg:text-right">
          <div className="text-[32px] lg:text-[40px] font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent">
            Melodies
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
