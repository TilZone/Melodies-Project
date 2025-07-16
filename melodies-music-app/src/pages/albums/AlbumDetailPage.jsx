import { PlayCircleOutlined, HeartOutlined } from '@ant-design/icons';
import SongRow from '../../components/common/SongRow'; // Giả sử có component này

// Mock Data - Sẽ được thay thế bằng API sau này
const albumData = {
  title: 'The Eminem Show',
  artist: { name: 'Eminem' },
  cover_big:
    'https://cdn.builder.io/api/v1/image/assets/TEMP/b683dc122ebed0cb216172ae7a9994fe3fdb8d25?width=320',
  nb_tracks: 20,
  duration: 4620, // 1h 14m in seconds
};

const songs = [
  {
    id: 1,
    title: 'White America',
    artist: { name: 'Eminem' },
    duration: 324,
    album: {
      cover_small:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a4bb52d6158b93c2a88f5d18095c7f57f1819ab5?width=100',
    },
  },
  {
    id: 2,
    title: 'Business',
    artist: { name: 'Eminem' },
    duration: 251,
    album: {
      cover_small:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a4bb52d6158b93c2a88f5d18095c7f57f1819ab5?width=100',
    },
  },
  {
    id: 3,
    title: "Cleaning' Out My Closet",
    artist: { name: 'Eminem' },
    duration: 297,
    album: {
      cover_small:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a4bb52d6158b93c2a88f5d18095c7f57f1819ab5?width=100',
    },
  },
  {
    id: 4,
    title: 'Square Dance',
    artist: { name: 'Eminem' },
    duration: 323,
    album: {
      cover_small:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a4bb52d6158b93c2a88f5d18095c7f57f1819ab5?width=100',
    },
  },
  {
    id: 5,
    title: 'When The Music Stops',
    artist: { name: 'Eminem' },
    duration: 269,
    album: {
      cover_small:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a4bb52d6158b93c2a88f5d18095c7f57f1819ab5?width=100',
    },
  },
  {
    id: 6,
    title: 'Soldier',
    artist: { name: 'Eminem' },
    duration: 226,
    album: {
      cover_small:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a4bb52d6158b93c2a88f5d18095c7f57f1819ab5?width=100',
    },
  },
];

const AlbumDetailPage = () => {
  // Logic để lấy albumId từ URL và fetch data sẽ được thêm vào sau

  return (
    <div className="text-white">
      {/* Album Info */}
      <div className="relative mx-5 mt-2 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#DA1111] via-[#FB0F0F]/8 to-transparent rounded-lg shadow-[3px_12px_4px_rgba(0,0,0,0.3)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#EF2424] via-[#FD1111]/2 to-transparent rounded-lg opacity-60"></div>

        <div className="relative p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={albumData.cover_big}
              alt={albumData.title}
              className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-lg object-cover shadow-[7px_9px_4px_rgba(0,0,0,0.35)] flex-shrink-0"
            />
            <div className="flex flex-col justify-end">
              <h2 className="text-white text-2xl md:text-4xl font-bold font-vazirmatn leading-normal">
                {albumData.title}
              </h2>
              <div className="flex items-center gap-2 mt-4">
                <img
                  src="https://e-cdns-images.dzcdn.net/images/artist/1324432e0b5d92c12f86346de63285f3/264x264-000000-80-0-0.jpg" // Placeholder
                  alt={albumData.artist.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-white text-base font-semibold font-vazirmatn">
                  {albumData.artist.name}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
                <span>{`${albumData.nb_tracks} songs`}</span>
                <span>•</span>
                <span>{`${Math.floor(albumData.duration / 3600)}h ${Math.floor((albumData.duration % 3600) / 60)}m`}</span>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <button className="bg-[#EE10B0] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#d90e9b] transition-colors flex items-center gap-2">
                  <PlayCircleOutlined />
                  Play
                </button>
                <button className="bg-black/20 border border-white/50 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center gap-2">
                  <HeartOutlined />
                  Like
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="px-6 space-y-1 pb-16">
        {songs.map((song, index) => (
          <SongRow key={song.id} song={song} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
