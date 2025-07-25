import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
} from 'lucide-react';
import { Slider } from 'antd';
import { usePlayerStore } from '../../store/usePlayerStore';
import { formatDuration } from '../../utils/formatters';
import { Link } from 'react-router-dom';

const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    repeatMode,
    isShuffled,
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    setVolume,
    setCurrentTime,
    cycleRepeatMode,
    toggleShuffle,
  } = usePlayerStore();

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 h-20 flex items-center justify-center text-gray-500 border-t border-gray-800 z-50">
        No song selected
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 h-20 flex items-center px-6 border-t border-gray-800 z-50">
      {/* Song Info */}
      <Link
        to={`/music/${currentSong._id}`}
        className="flex items-center flex-grow-0 flex-shrink-0 w-1/4"
      >
        <img
          src={currentSong.coverArt}
          alt={currentSong.title}
          className="w-14 h-14 rounded-md object-cover mr-4"
        />
        <div>
          <h4 className="text-white font-semibold text-base truncate w-40">{currentSong.title}</h4>
          <p className="text-gray-400 text-sm truncate w-40">
            {currentSong.artist?.name || 'Unknown Artist'}
          </p>
        </div>
      </Link>

      {/* Playback Controls */}
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="flex items-center space-x-6 mb-1">
          <button
            onClick={toggleShuffle}
            className="text-gray-400 hover:text-white transition-colors"
            title="Shuffle"
          >
            <Shuffle size={20} className={isShuffled ? 'text-pink-500' : ''} />
          </button>
          <button
            onClick={skipToPrevious}
            className="text-gray-400 hover:text-white transition-colors"
            title="Previous"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlayPause}
            className="text-white hover:scale-105 transition-transform"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={32} fill="currentColor" />
            ) : (
              <Play size={32} fill="currentColor" />
            )}
          </button>
          <button
            onClick={skipToNext}
            className="text-gray-400 hover:text-white transition-colors"
            title="Next"
          >
            <SkipForward size={20} />
          </button>
          <button
            onClick={cycleRepeatMode}
            className="text-gray-400 hover:text-white transition-colors"
            title="Repeat"
          >
            <Repeat size={20} className={repeatMode !== 'none' ? 'text-pink-500' : ''} />
          </button>
        </div>
        {/* Progress Bar */}
        <div className="flex items-center w-full max-w-2xl">
          <span className="text-xs text-gray-400 mr-2">{formatDuration(currentTime)}</span>
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={setCurrentTime}
            step={0.1}
            tooltip={{ formatter: null }} // Hide tooltip
            className="flex-grow mx-2 player-slider"
          />
          <span className="text-xs text-gray-400 ml-2">{formatDuration(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center flex-grow-0 flex-shrink-0 w-1/4 justify-end">
        <button
          onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
          className="text-gray-400 hover:text-white transition-colors mr-2"
          title="Mute/Unmute"
        >
          {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={setVolume}
          tooltip={{ formatter: null }} // Hide tooltip
          className="w-24 volume-slider"
        />
      </div>
    </div>
  );
};

export default PlayerBar;
