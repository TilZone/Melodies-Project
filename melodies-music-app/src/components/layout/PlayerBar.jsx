import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../store/usePlayerStore';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

const PlayerBar = () => {
  const navigate = useNavigate();
  const { currentSong, isPlaying, togglePlayPause } = usePlayerStore();

  if (!currentSong) {
    return null; // Don't render anything if no song is selected
  }

  const handlePlayPauseClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the play/pause button
    togglePlayPause();
  };

  return (
    <div
      className="fixed bottom-[90px] left-0 right-0 z-40 px-4"
      onClick={() => navigate(`/music/${currentSong.id}`)}
    >
      <div className="bg-gray-100/80 dark:bg-[#252525]/80 backdrop-blur-md rounded-lg p-2 flex items-center justify-between cursor-pointer shadow-lg">
        {/* Song Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={currentSong.coverArt}
            alt={currentSong.title}
            className="w-12 h-12 rounded-md"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-gray-900 dark:text-white truncate">
              {currentSong.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
              {currentSong.artist?.name || 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-4 pr-2">
          <button onClick={handlePlayPauseClick} className="text-gray-800 dark:text-white text-4xl">
            {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
