import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';

const SongCard = ({ song, queue, currentSong, isPlaying, onPlayPauseClick }) => {
  const isCurrentSongPlaying = isPlaying && currentSong?.title === song.title;

  if (!song || !song.artist) {
    // Render a placeholder or null if song or artist is missing
    return null;
  }

  const handlePlayPause = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the play button
    e.stopPropagation();
    onPlayPauseClick();
  };

  return (
    <Link
      to={`/music/${song._id}`}
      state={{ queue: queue, startIndex: queue.findIndex((s) => s._id === song._id) }}
      className="block group w-48 flex-shrink-0"
    >
      <div className="relative">
        <img
          src={song.coverArt}
          alt={song.title}
          className="w-full h-48 rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button
          onClick={handlePlayPause}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-pink-500/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:bg-pink-500 hover:scale-110"
          aria-label={isCurrentSongPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
        >
          {isCurrentSongPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" />
          )}
        </button>
      </div>
      <div className="mt-2">
        <h4 className="font-semibold text-white truncate" title={song.title}>
          {song.title}
        </h4>
        <p className="text-sm text-gray-400 truncate" title={song.artist.name}>
          {song.artist.name}
        </p>
      </div>
    </Link>
  );
};

SongCard.propTypes = {
  song: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    coverArt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  queue: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSong: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  onPlayPauseClick: PropTypes.func.isRequired,
};

export default SongCard;
