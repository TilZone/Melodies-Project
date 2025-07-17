import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchSongById } from '../../services/song.service.js';
import { usePlayerStore } from '../../store/usePlayerStore.js';
import { Spin, Alert, Button, Slider } from 'antd';
import { useMediaQuery } from 'react-responsive';
import MobilePlayer from './MobilePlayer';

// Desktop-specific imports
import {
  PauseCircleFilled,
  PlayCircleFilled,
  StepForwardOutlined,
  StepBackwardOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { Repeat, Shuffle } from 'lucide-react';

// Custom hook to check screen size
const useResponsive = () => useMediaQuery({ query: '(max-width: 768px)' });

// Helper to parse LRC format lyrics: [mm:ss.xx] text
import { useLyricParser } from '../../hooks/useLyricParser';

const formatTime = (seconds) => {
  const date = new Date(seconds * 1000);
  const minutes = date.getUTCMinutes();
  const secs = date.getUTCSeconds().toString().padStart(2, '0');
  return `${minutes}:${secs}`;
};

const MusicPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useResponsive();
  const lyricsContainerRef = useRef(null);
  const activeLyricRef = useRef(null);

  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    repeatMode,
    isShuffled,
    playSong,
    togglePlayPause,
    playNext,
    playPrevious,
    setCurrentTime,
    setVolume,
    toggleShuffle,
    setRepeatMode,
    queue,
  } = usePlayerStore();

  const lyrics = useLyricParser(currentSong?.lyrics);

  useEffect(() => {
    const loadSong = async () => {
      if (id && id !== currentSong?._id) {
        setLoading(true);
        setError(null);
        try {
          const songFromQueue = queue.find((s) => s._id === id);
          if (songFromQueue) {
            playSong(songFromQueue, queue);
          } else {
            const fetchedSong = await fetchSongById(id);
            if (fetchedSong) {
              playSong(fetchedSong, [fetchedSong]); // Play song and set it as the queue
            } else {
              setError('Song not found.');
            }
          }
        } catch (err) {
          setError('Failed to load the song.');
        } finally {
          setLoading(false);
        }
      }
    };

    loadSong();
  }, [id, playSong, currentSong?._id, queue]);

  // Find the current active lyric line
  const activeLyricIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    return currentTime >= line.time && (nextLine ? currentTime < nextLine.time : true);
  });

  // Scroll active lyric into view
  useEffect(() => {
    if (activeLyricRef.current && lyricsContainerRef.current) {
      lyricsContainerRef.current.scrollTo({
        top: activeLyricRef.current.offsetTop - lyricsContainerRef.current.clientHeight / 2.5,
        behavior: 'smooth',
      });
    }
  }, [activeLyricIndex]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <Alert message={error} type="error" showIcon />
        <Button onClick={() => navigate('/discover')} className="mt-4">
          Back to Discover
        </Button>
      </div>
    );
  }

  if (!currentSong) {
    return (
      <div className="text-center p-8">
        <p>No song is currently selected.</p>
        <Link to="/discover">Find a song to play</Link>
      </div>
    );
  }

  // Render Mobile UI if on a small screen
  if (isMobile) {
    return <MobilePlayer song={currentSong} onClose={() => navigate(-1)} />;
  }

  // Render Desktop UI
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Blurred Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSong.coverArt}
          alt="background"
          className="w-full h-full object-cover filter blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 desktop-player-grid">
        {/* Left Column: Cover Art and Controls */}
        <div className="flex flex-col items-center justify-center p-8">
          <img
            src={currentSong.coverArt}
            alt={currentSong.title}
            className="w-64 h-64 rounded-lg shadow-2xl mb-6"
          />
          <h2 className="text-2xl font-bold text-white">{currentSong.title}</h2>
          <p className="text-lg text-gray-300 mb-6">{currentSong.artist?.name}</p>
          <div className="w-full max-w-sm">
            <Slider
              min={0}
              max={duration}
              value={currentTime}
              onChange={(value) => setCurrentTime(value)}
              tooltip={{ formatter: formatTime }}
              step={0.1}
              trackStyle={{ backgroundColor: '#ec4899' }}
              handleStyle={{ borderColor: '#ec4899' }}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-4">
            <button
              onClick={toggleShuffle}
              className={`text-2xl ${isShuffled ? 'text-pink-500' : 'text-gray-500 dark:text-gray-400'} hover:text-pink-500 dark:hover:text-pink-400 transition-colors`}
            >
              <Shuffle size={24} />
            </button>
            <button
              onClick={playPrevious}
              className="text-4xl text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
            >
              <StepBackwardOutlined />
            </button>
            <button
              onClick={togglePlayPause}
              className="text-7xl text-pink-500 hover:text-pink-600 transition-transform hover:scale-105"
            >
              {isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
            </button>
            <button
              onClick={playNext}
              className="text-4xl text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
            >
              <StepForwardOutlined />
            </button>
            <button
              onClick={() => setRepeatMode()}
              className={`text-2xl relative ${repeatMode !== 'none' ? 'text-pink-500' : 'text-gray-500 dark:text-gray-400'} hover:text-pink-500 dark:hover:text-pink-400 transition-colors`}
            >
              <Repeat size={24} />
              {repeatMode === 'one' && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-4 w-full max-w-xs">
            <SoundOutlined className="text-gray-500 dark:text-gray-400" />
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={setVolume}
              className="flex-grow"
              trackStyle={{ backgroundColor: '#9ca3af' }}
              handleStyle={{ borderColor: '#9ca3af' }}
            />
          </div>
        </div>

        {/* Right Column: Lyrics */}
        <div className="lyrics-container-desktop bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-white p-4 border-b border-white/10">Lyrics</h3>
          <div
            ref={lyricsContainerRef}
            className="lyrics-scroll-container space-y-4 text-center p-4"
          >
            {lyrics.length > 0 ? (
              lyrics.map((line, index) => (
                <p
                  key={index}
                  ref={index === activeLyricIndex ? activeLyricRef : null}
                  className={`lyric-line ${
                    index === activeLyricIndex
                      ? 'text-pink-400 font-bold scale-105'
                      : 'text-gray-300'
                  }`}
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
    </div>
  );
};

export default MusicPage;
