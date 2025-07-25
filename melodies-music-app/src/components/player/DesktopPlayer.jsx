import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider, Drawer } from 'antd';
import {
  PauseCircleFilled,
  PlayCircleFilled,
  StepForwardOutlined,
  StepBackwardOutlined,
  SoundOutlined,
  MenuOutlined, // For queue button
} from '@ant-design/icons';
import { Repeat, Repeat1, Shuffle } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useLyricParser } from '../../hooks/useLyricParser';
import { formatTime } from '../../utils/formatters';
import SafeImage from '../../components/common/SafeImage';
import SongRow from '../../components/common/SongRow'; // Import SongRow for queue display

const DesktopPlayer = ({ song }) => {
  const lyricsContainerRef = useRef(null);
  const activeLyricRef = useRef(null);
  const [queueVisible, setQueueVisible] = useState(false); // State for queue drawer visibility

  // Select only the state and actions needed for this component
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    repeatMode,
    isShuffled,
    queue, // Get queue from store
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    setVolume,
    toggleShuffle,
    cycleRepeatMode,
    setCurrentTime, // Get setCurrentTime directly
    setSong, // Get setSong to play from queue
  } = usePlayerStore();

  const { lyrics, activeLyricIndex } = useLyricParser(song?.lyrics, currentTime);

  // Tự động cuộn đến dòng lyric đang phát
  useEffect(() => {
    if (activeLyricRef.current && lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const activeLine = activeLyricRef.current;
      const scrollPosition =
        activeLine.offsetTop - container.clientHeight / 2 + activeLine.clientHeight / 2;
      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [activeLyricIndex, lyricsContainerRef, activeLyricRef]); // Add dependencies

  if (!song) return null; // Handle case where song is not provided

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={song.coverArt}
          alt="background"
          className="h-full w-full object-cover blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Grid Layout */}
      <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-2">
        {/* Left: Cover & Controls */}
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-64 h-64 flex-shrink-0">
            <SafeImage
              src={song.coverArt}
              alt={song.title}
              className="h-full w-full rounded-lg object-cover shadow-2xl"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white">{song.title}</h2>
          <Link
            to={`/artists/${song.artist?._id}`}
            className="text-lg text-gray-300 hover:underline"
          >
            {song.artist?.name}
          </Link>

          {/* Progress Bar */}
          <div className="mt-6 w-full max-w-sm">
            <Slider
              min={0}
              max={duration}
              value={currentTime}
              onChange={setCurrentTime} // Use setCurrentTime directly
              tooltip={{ formatter: formatTime }}
              step={0.1}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="mt-4 flex items-center justify-center space-x-6">
            <button onClick={toggleShuffle} title="Shuffle">
              <Shuffle
                size={24}
                className={isShuffled ? 'text-pink-500' : 'text-gray-400 hover:text-white'}
              />
            </button>
            <button onClick={skipToPrevious} title="Previous">
              <StepBackwardOutlined className="text-4xl text-gray-200 hover:text-white" />
            </button>
            <button onClick={togglePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <PauseCircleFilled className="text-7xl text-pink-500 transition hover:scale-105" />
              ) : (
                <PlayCircleFilled className="text-7xl text-pink-500 transition hover:scale-105" />
              )}
            </button>
            <button onClick={skipToNext} title="Next">
              <StepForwardOutlined className="text-4xl text-gray-200 hover:text-white" />
            </button>
            <button onClick={cycleRepeatMode} title="Repeat" className="relative">
              {repeatMode === 'one' ? (
                <Repeat1 size={24} className="text-pink-500" />
              ) : (
                <Repeat
                  size={24}
                  className={
                    repeatMode === 'all' ? 'text-pink-500' : 'text-gray-400 hover:text-white'
                  }
                />
              )}
            </button>
          </div>

          {/* Volume Control */}
          <div className="mt-4 flex w-full max-w-xs items-center space-x-2">
            <SoundOutlined className="text-gray-400" />
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={setVolume}
              className="flex-grow"
            />
          </div>

          {/* Queue Button */}
          <button
            onClick={() => setQueueVisible(true)}
            className="mt-4 text-gray-400 hover:text-white"
            title="Show Queue"
          >
            <MenuOutlined className="text-2xl" />
          </button>
        </div>

        {/* Right: Lyrics */}
        <div className="hidden md:flex flex-col bg-black/30 backdrop-blur-sm rounded-lg m-4">
          <h3 className="p-4 text-xl font-bold text-white border-b border-white/10">Lyrics</h3>
          <div
            ref={lyricsContainerRef}
            className="flex-grow overflow-y-auto p-4 text-center space-y-4"
          >
            {lyrics.length > 0 ? (
              lyrics.map((line, index) => (
                <p
                  key={index}
                  ref={index === activeLyricIndex ? activeLyricRef : null}
                  className={`cursor-pointer transition-all duration-300 ${
                    index === activeLyricIndex
                      ? 'text-pink-400 font-bold text-2xl opacity-100'
                      : 'text-gray-400 text-xl opacity-50 hover:opacity-75'
                  }`}
                  onClick={() => setCurrentTime(line.time)}
                >
                  {line.text}
                </p>
              ))
            ) : (
              <p className="text-gray-400">No lyrics available for this song.</p>
            )}
          </div>
        </div>
      </div>

      {/* Queue Drawer */}
      <Drawer
        title="Now Playing Queue"
        placement="right"
        onClose={() => setQueueVisible(false)}
        open={queueVisible}
        rootStyle={{ position: 'absolute' }} // Use rootStyle instead of style
        className="[&_.ant-drawer-header]:bg-gray-800 [&_.ant-drawer-header]:border-b [&_.ant-drawer-header]:border-gray-700 [&_.ant-drawer-title]:text-white [&_.ant-drawer-close]:text-white [&_.ant-drawer-body]:bg-gray-900 [&_.ant-drawer-body]:p-0"
      >
        <div className="p-4 space-y-2">
          {queue.length > 0 ? (
            queue.map((qSong, index) => (
              <SongRow
                key={qSong._id}
                song={qSong}
                rank={index + 1}
                onPlay={() => {
                  console.log('Attempting to play song from queue:', qSong.title);
                  setSong(qSong, queue);
                }} // Play song from queue
                isDesktop={true} // Always true for desktop queue display
              />
            ))
          ) : (
            <p className="text-gray-400 text-center">Queue is empty.</p>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default DesktopPlayer;
