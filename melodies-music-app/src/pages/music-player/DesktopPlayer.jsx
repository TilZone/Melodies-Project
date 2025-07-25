import { useRef, useEffect } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { parseLyrics } from '../../utils/lyricParser';
import { Slider } from 'antd';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';

const DesktopPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isShuffled,
    repeatMode,
    togglePlay,
    seek,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeatMode,
  } = usePlayerStore();

  const parsedLyrics = currentSong?.lyrics ? parseLyrics(currentSong.lyrics) : [];
  const activeLineIndex = parsedLyrics.findIndex((line, index) => {
    const nextLine = parsedLyrics[index + 1];
    return currentTime >= line.time && (nextLine ? currentTime < nextLine.time : true);
  });

  const activeLineRef = useRef(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeLineIndex]);

  if (!currentSong) return null;

  return (
    <div className="grid grid-cols-12 gap-8 p-8 h-[calc(100vh-160px)]">
      {/* Left Column: Album Art & Controls */}
      <div className="col-span-4 flex flex-col items-center justify-center">
        <img
          src={currentSong.thumbnail}
          alt={currentSong.title}
          className="w-full max-w-sm aspect-square rounded-lg shadow-lg mb-8"
        />
        <h2 className="text-3xl font-bold text-white">{currentSong.title}</h2>
        <p className="text-lg text-gray-400">{currentSong.artist.name}</p>

        {/* Progress Bar */}
        <div className="w-full max-w-sm mt-4">
          <Slider
            value={currentTime}
            max={duration}
            onChange={seek}
            tooltip={{
              formatter: (value) =>
                `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>
              {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
            </span>
            <span>
              {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <button
            onClick={toggleShuffle}
            className={isShuffled ? 'text-[#EE10B0]' : 'text-gray-400'}
          >
            <Shuffle size={24} />
          </button>
          <button onClick={playPrevious}>
            <SkipBack size={32} />
          </button>
          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-[#EE10B0] rounded-full flex items-center justify-center text-black"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </button>
          <button onClick={playNext}>
            <SkipForward size={32} />
          </button>
          <button
            onClick={toggleRepeatMode}
            className={repeatMode !== 'none' ? 'text-[#EE10B0]' : 'text-gray-400'}
          >
            <Repeat size={24} />
          </button>
        </div>
      </div>

      {/* Right Column: Lyrics */}
      <div className="col-span-8 overflow-y-auto scrollbar-hide pr-4">
        <div className="space-y-6 text-center">
          {parsedLyrics.map((line, index) => (
            <p
              key={index}
              ref={index === activeLineIndex ? activeLineRef : null}
              className={`transition-all duration-300 text-2xl font-semibold ${index === activeLineIndex ? 'text-white scale-105' : 'text-gray-500'}`}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopPlayer;
