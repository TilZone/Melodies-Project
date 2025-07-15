import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, MoreOutlined } from '@ant-design/icons';

// NOTE: This component is currently using static mock data based on the Figma design.
// It should be updated to fetch album details by ID from an API when available.

const AlbumDetailPage = () => {
  const navigate = useNavigate();

  // Mock data matching the Figma design for "The Eminem Show"
  const albumData = {
    title: 'The Eminem Show',
    artist: 'Eminem',
    cover:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/b683dc122ebed0cb216172ae7a9994fe3fdb8d25?width=320',
    artistImage: 'https://i.scdn.co/image/ab676161000051743e3e53307a3b2510a972f3c8', // Placeholder artist image
    songCount: '20 songs',
    duration: '1h 14m',
  };

  const songs = [
    { id: 1, title: 'White America', isPlaying: true },
    { id: 2, title: 'Business' },
    { id: 3, title: "Cleaning' Out My Closet" },
    { id: 4, title: 'Square Dance' },
    { id: 5, title: 'When The Music Stops' },
    { id: 6, title: 'Soldier' },
    { id: 7, title: 'Say Good Bye Hollywood' },
    { id: 8, title: 'Drips' },
    { id: 9, title: 'Without Me' },
    { id: 10, title: 'Sing For The Moment' },
  ];

  const SongRow = ({ song, rank }) => (
    <div
      className="flex items-center bg-gradient-to-r from-[#E71C1C]/80 to-[#6A1C27]/80 rounded-md p-3 shadow-md"
      // onClick={() => playSong(song)} // TODO: Integrate with player store
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {song.isPlaying ? (
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.33325 7C3.33325 6.20435 3.59664 5.44129 4.06549 4.87868C4.53433 4.31607 5.17021 4 5.83325 4H6.66659C7.32963 4 7.96551 4.31607 8.43435 4.87868C8.90319 5.44129 9.16658 6.20435 9.16658 7V17C9.16658 17.7956 8.90319 18.5587 8.43435 19.1213C7.96551 19.6839 7.32963 20 6.66659 20H5.83325C5.17021 20 4.53433 19.6839 4.06549 19.1213C3.59664 18.5587 3.33325 17.7956 3.33325 17V7ZM13.3333 4C12.6702 4 12.0343 4.31607 11.5655 4.87868C11.0966 5.44129 10.8333 6.20435 10.8333 7V17C10.8333 17.7956 11.0966 18.5587 11.5655 19.1213C12.0343 19.6839 12.6702 20 13.3333 20H14.1666C14.8296 20 15.4655 19.6839 15.9344 19.1213C16.4032 18.5587 16.6666 17.7956 16.6666 17V7C16.6666 6.20435 16.4032 5.44129 15.9344 4.87868C15.4655 4.31607 14.8296 4 14.1666 4H13.3333Z"
              fill="white"
            />
          </svg>
        ) : (
          <span className="text-white text-base font-semibold w-5 text-center">{rank}</span>
        )}
        <div className="flex flex-col min-w-0">
          <h3 className="text-white text-base font-semibold truncate">{song.title}</h3>
          <p className="text-white text-xs font-light opacity-80 truncate">{albumData.artist}</p>
        </div>
      </div>
      <MoreOutlined className="text-white text-lg" />
    </div>
  );

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <ArrowLeftOutlined
          className="text-[#0E9EEF] text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-extrabold">
          <span className="text-[#0E9EEF]">Alb</span>
          <span className="text-[#EE10B0]">um</span>
        </h1>
        <MoreOutlined className="text-[#EE10B0] text-2xl cursor-pointer" />
      </div>

      {/* Album Info */}
      <div className="relative p-4 rounded-lg bg-gradient-to-r from-red-600/50 to-red-900/50 mb-6">
        <div className="flex gap-4">
          <img
            src={albumData.cover}
            alt={albumData.title}
            className="w-32 h-32 rounded-lg object-cover shadow-lg"
          />
          <div className="flex flex-col justify-between">
            <h2 className="text-white text-xl font-bold">{albumData.title}</h2>
            <div className="flex items-center gap-2">
              <img
                src={albumData.artistImage}
                alt={albumData.artist}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white text-sm font-semibold">{albumData.artist}</span>
            </div>
            <div className="text-white text-xs font-semibold">
              <span>{albumData.songCount}</span>
              <span className="mx-2">•</span>
              <span>{albumData.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-3">
        {songs.map((song, index) => (
          <SongRow key={song.id} song={song} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
