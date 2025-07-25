import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import { Play, Heart, Pause } from 'lucide-react';
import { fetchAlbumById } from '../../services/album.service';
import { usePlayerStore } from '../../store/usePlayerStore';
import { formatDuration } from '../../utils/formatters';

// --- Sub-components for Album Detail Page ---

const AlbumHero = ({ album, onPlayAll }) => (
  <div className="relative p-6 rounded-lg overflow-hidden bg-gradient-to-r from-pink-500/20 to-red-500/20">
    <div className="flex flex-col md:flex-row gap-6 relative z-10">
      <img
        src={album.thumbnail}
        alt={album.title}
        className="w-40 h-40 md:w-48 md:h-48 rounded-lg object-cover shadow-lg"
      />
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{album.title}</h2>
        <div className="flex items-center mt-4">
          <img
            src={album.artist.thumbnail}
            alt={album.artist.name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <Link
            to={`/artists/${album.artist._id}`}
            className="text-lg font-semibold hover:underline"
          >
            {album.artist.name}
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-4 text-gray-300 text-sm">
          <span>{album.songs.length} songs</span>
          <span>•</span>
          <span>{new Date(album.releaseDate).getFullYear()}</span>
        </div>
        <button
          onClick={onPlayAll}
          className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors flex items-center gap-2 w-fit"
        >
          <Play className="w-6 h-6" />
          Play All
        </button>
      </div>
    </div>
  </div>
);

const SongRow = ({ song, rank, onPlay, isPlaying, isCurrent }) => (
  <div
    className={`grid grid-cols-[auto,1fr,auto] items-center gap-4 p-3 rounded-lg transition-colors ${isCurrent ? 'bg-white/20' : 'hover:bg-white/10'}`}
  >
    <div className="flex items-center justify-center w-8">
      {isCurrent && isPlaying ? (
        <Pause className="w-5 h-5 text-pink-400 cursor-pointer" onClick={onPlay} />
      ) : (
        <Play
          className="w-5 h-5 text-gray-300 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onPlay}
        />
      )}
      <span className={`text-gray-400 font-medium ${isCurrent || 'group-hover:hidden'}`}>
        {rank}
      </span>
    </div>
    <div className="flex flex-col">
      <h4 className={`font-semibold truncate ${isCurrent ? 'text-pink-400' : 'text-white'}`}>
        {song.title}
      </h4>
      <p className="text-gray-400 text-sm truncate">{song.artist.name}</p>
    </div>
    <div className="flex items-center gap-4">
      <Heart className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
      <span className="text-gray-400 text-sm">{formatDuration(song.duration)}</span>
    </div>
  </div>
);

// --- Main Component ---

const AlbumDetailPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentSong, isPlaying, setSong, togglePlayPause } = usePlayerStore();

  useEffect(() => {
    const loadAlbumDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAlbumById(id);
        if (response.success) {
          setAlbum(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch album details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadAlbumDetails();
  }, [id]);

  const handlePlaySong = (song) => {
    if (currentSong?._id === song._id) {
      togglePlayPause();
    } else {
      setSong(song, album.songs);
    }
  };

  const handlePlayAll = () => {
    if (album?.songs?.length > 0) {
      setSong(album.songs[0], album.songs);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!album) {
    return <div className="p-8 text-center text-gray-500">Album not found.</div>;
  }

  return (
    <div className="text-white space-y-8">
      <AlbumHero album={album} onPlayAll={handlePlayAll} />
      <div className="px-2 md:px-0">
        <div className="flex flex-col gap-2 group">
          {album.songs.map((song, index) => (
            <SongRow
              key={song._id}
              song={song}
              rank={index + 1}
              onPlay={() => handlePlaySong(song)}
              isCurrent={currentSong?._id === song._id}
              isPlaying={isPlaying}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailPage;
