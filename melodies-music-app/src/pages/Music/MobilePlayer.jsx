import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import { usePlayerStore } from '../../store/usePlayerStore';
import { formatTime } from '../../utils/formatters';

const MobilePlayer = ({ song, lyrics }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('song');

  const {
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seek,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
    isShuffled,
    repeatMode,
  } = usePlayerStore();

  const handleProgressChange = (e) => {
    seek(Number(e.target.value));
  };

  const activeLyricIndex = useMemo(() => {
    if (!lyrics || lyrics.length === 0) return -1;
    // Find the last lyric that has a timestamp before the current time
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (lyrics[i].timestamp <= currentTime) {
        return i;
      }
    }
    return -1;
  }, [lyrics, currentTime]);

  if (!song) {
    return null; // Or a loading/error state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#412C3A] to-[#0E1920] relative overflow-hidden text-white font-vazirmatn">
      {/* Background with blur effect */}
      <div className="absolute inset-0">
        <img
          src={song.album?.cover_xl || song.album?.cover_big}
          alt=""
          className="w-full h-full object-cover filter blur-[15px] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#412C3A]/80 to-[#0E1920]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col p-6">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="active:scale-90 transition-transform">
            <ArrowLeftOutlined className="text-[#0E9EEF] text-3xl" />
          </button>
          <h1 className="text-2xl font-bold">
            <span className="text-[#0E9EEF]">Now</span>
            <span className="text-[#EE10B0]"> Playing</span>
          </h1>
          <button className="active:scale-90 transition-transform">
            <MoreOutlined className="text-[#EE10B0] text-3xl" />
          </button>
        </div>

        {/* Album Art */}
        <div className="flex justify-center mb-8 flex-grow items-center">
          <img
            src={song.album?.cover_big || song.album?.cover_medium}
            alt={song.title}
            className={`object-cover shadow-2xl ${activeTab === 'song' ? 'w-full max-w-[350px] h-auto aspect-square rounded-lg' : 'w-48 h-48 rounded-full'} transition-all duration-500`}
          />
        </div>

        {/* Song Info & Lyrics Toggle */}
        <div className="mb-8">
          <div
            className={`text-center mb-6 transition-opacity duration-300 ${activeTab === 'lyrics' ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}
          >
            <h2 className="text-3xl font-bold truncate">{song.title}</h2>
            <p className="text-xl text-white/80 truncate">{song.artist?.name}</p>
          </div>

          {/* Tab Buttons */}
          <div className="bg-[#630A4A]/50 rounded-lg h-10 flex relative p-1">
            <div
              className={`absolute top-1 h-8 bg-[#EE10B0] rounded-md transition-all duration-300 ${
                activeTab === 'song' ? 'left-1 w-1/2' : 'left-1/2 w-1/2'
              }`}
            ></div>
            <button
              className={`flex-1 flex items-center justify-center gap-2 z-10 transition-colors font-bold text-sm ${activeTab === 'song' ? 'text-white' : 'text-white/70'}`}
              onClick={() => setActiveTab('song')}
            >
              Song
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 z-10 transition-colors font-bold text-sm ${activeTab === 'lyrics' ? 'text-white' : 'text-white/70'}`}
              onClick={() => setActiveTab('lyrics')}
            >
              Lyrics
            </button>
          </div>
        </div>

        {/* Lyrics View */}
        <div
          className={`flex-grow mb-8 overflow-y-auto text-center transition-opacity duration-300 ${activeTab === 'lyrics' ? 'opacity-100' : 'opacity-0 h-0 pointer-events-none'}`}
        >
          <div className="flex flex-col items-center space-y-4">
            {lyrics && lyrics.length > 0 ? (
              lyrics.map((line, index) => (
                <p
                  key={index}
                  className={`font-vazirmatn transition-all duration-300 ${
                    index === activeLyricIndex
                      ? 'text-white text-2xl font-bold scale-105'
                      : 'text-white/60 text-lg font-normal'
                  }`}
                >
                  {line.text}
                </p>
              ))
            ) : (
              <p className="text-white/60">No lyrics available for this song.</p>
            )}
          </div>
        </div>

        {/* Player Controls */}
        <div className="pb-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs font-mono mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={toggleShuffle}
              className={`transition-colors active:scale-90 ${isShuffled ? 'text-[#EE10B0]' : 'text-white/70'}`}
            >
              <i className="fas fa-random text-2xl"></i>
            </button>
            <button onClick={playPrevious} className="active:scale-90 transition-transform">
              <i className="fas fa-step-backward text-3xl"></i>
            </button>
            <button
              onClick={togglePlayPause}
              className="w-20 h-20 bg-gradient-to-br from-[#EE10B0] to-[#630A4A] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <PauseCircleOutlined className="text-5xl text-white" />
              ) : (
                <PlayCircleOutlined className="text-5xl text-white" />
              )}
            </button>
            <button onClick={playNext} className="active:scale-90 transition-transform">
              <i className="fas fa-step-forward text-3xl"></i>
            </button>
            <button
              onClick={toggleRepeat}
              className={`transition-colors active:scale-90 ${repeatMode !== 'none' ? 'text-[#EE10B0]' : 'text-white/70'}`}
            >
              <i className={`fas fa-repeat text-2xl`}></i>
              {repeatMode === 'one' && (
                <span className="absolute text-xs -top-1 -right-1 bg-[#EE10B0] text-white rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
