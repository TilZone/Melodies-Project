import { usePlayerStore } from '../../store/usePlayerStore';
import { Slider, Typography } from 'antd';
import {
  ChevronDown,
  MoreHorizontal,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from 'lucide-react';
import './MobilePlayer.css';

const { Text } = Typography;

const formatTime = (seconds) => {
  const date = new Date(seconds * 1000);
  const minutes = date.getUTCMinutes();
  const secs = date.getUTCSeconds().toString().padStart(2, '0');
  return `${minutes}:${secs}`;
};

const MobilePlayer = ({ onClose }) => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    playNext,
    playPrevious,
    setCurrentTime,
    repeatMode,
    isShuffled,
    toggleShuffle,
    setRepeatMode,
  } = usePlayerStore();

  if (!currentSong) return null;

  const handleProgressChange = (value) => {
    setCurrentTime(value);
  };

  return (
    <div className="mobile-player-fullscreen">
      <div className="mobile-player-header">
        <button onClick={onClose} className="icon-btn">
          <ChevronDown size={24} />
        </button>
        <div className="text-center">
          <Text className="text-xs uppercase">Playing From Album</Text>
          <Text strong className="block">
            {currentSong.album?.title || 'Single'}
          </Text>
        </div>
        <button className="icon-btn">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="mobile-player-body">
        <img src={currentSong.coverArt} alt={currentSong.title} className="cover-art-mobile" />
      </div>

      <div className="mobile-player-footer">
        <div className="song-info">
          <Text strong className="text-2xl">
            {currentSong.title}
          </Text>
          <Text type="secondary" className="text-base">
            {currentSong.artist?.name}
          </Text>
        </div>

        <div className="progress-container">
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            tooltip={{ formatter: formatTime }}
            step={0.1}
          />
          <div className="time-labels">
            <Text type="secondary">{formatTime(currentTime)}</Text>
            <Text type="secondary">{formatTime(duration)}</Text>
          </div>
        </div>

        <div className="controls-container">
          <button
            onClick={toggleShuffle}
            className={`icon-btn ${
              isShuffled ? 'active' : ''
            } transition-transform active:scale-90`}
          >
            <Shuffle size={20} />
          </button>
          <button
            onClick={playPrevious}
            className="icon-btn transition-transform active:scale-90"
          >
            <SkipBack size={28} />
          </button>
          <button
            onClick={togglePlayPause}
            className="play-pause-btn transition-transform active:scale-90"
          >
            {isPlaying ? <Pause size={36} /> : <Play size={36} />}
          </button>
          <button onClick={playNext} className="icon-btn transition-transform active:scale-90">
            <SkipForward size={28} />
          </button>
          <button
            onClick={() => setRepeatMode()}
            className={`icon-btn ${
              repeatMode !== 'none' ? 'active' : ''
            } transition-transform active:scale-90`}
          >
            <Repeat size={20} />
            {repeatMode === 'one' && <span className="repeat-one-badge">1</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
