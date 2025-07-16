import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchSongById } from '../../services/song.service.js';
import { usePlayerStore } from '../../store/usePlayerStore.js';
import { Spin, Alert, Button, Slider, Typography } from 'antd';
import {
  PauseCircleFilled,
  PlayCircleFilled,
  StepForwardOutlined,
  StepBackwardOutlined,
  SoundOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Repeat, Shuffle } from 'lucide-react';
import MobilePlayer from './MobilePlayer';

const { Title, Text } = Typography;

// Custom hook to check screen size
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Helper to parse LRC format lyrics: [mm:ss.xx] text
const parseLyrics = (lyricsText) => {
  if (!lyricsText) return [];
  const lines = lyricsText.split('\n');
  const result = [];
  for (const line of lines) {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10);
      const time = minutes * 60 + seconds + milliseconds / 1000;
      const text = match[4].trim();
      result.push({ time, text });
    }
  }
  return result;
};

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
  const isMobile = useMediaQuery('(max-width: 768px)');
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
  } = usePlayerStore();

  const lyrics = parseLyrics(currentSong?.lyrics);

  useEffect(() => {
    const loadSong = async () => {
      if (id && id !== currentSong?.id) {
        setLoading(true);
        setError(null);
        try {
          const fetchedSong = await fetchSongById(id);
          if (fetchedSong) {
            playSong(fetchedSong, [fetchedSong]); // Play song and set it as the queue
          } else {
            setError('Song not found.');
          }
        } catch (err) {
          setError('Failed to load the song.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadSong();
  }, [id, playSong, currentSong?.id]);

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
    return <MobilePlayer onClose={() => navigate(-1)} />;
  }

  // Render Desktop UI
  return (
    <div className="flex flex-row h-[calc(100vh-var(--header-height)-var(--player-height))] text-white bg-gradient-to-br from-[#1c1c1c] to-[#121212]">
      {/* Left Side: Album Art & Controls */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 space-y-6">
        <img
          src={currentSong.coverArt}
          alt={currentSong.title}
          className="w-full max-w-md aspect-square rounded-lg shadow-2xl object-cover"
        />
        <div className="w-full max-w-md text-center">
          <Title level={2} className="text-white">
            {currentSong.title}
          </Title>
          <Text className="text-gray-400 text-lg">{currentSong.artist?.name}</Text>
        </div>
        <div className="w-full max-w-md space-y-3">
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={setCurrentTime}
            tooltip={{ formatter: formatTime }}
            step={0.1}
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-8 w-full max-w-md">
          <button
            onClick={toggleShuffle}
            className={`text-gray-400 hover:text-white transition-colors ${isShuffled ? 'text-green-500' : ''}`}
          >
            <Shuffle size={20} />
          </button>
          <button
            onClick={playPrevious}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <StepBackwardOutlined style={{ fontSize: '24px' }} />
          </button>
          <button onClick={togglePlayPause} className="text-white">
            {isPlaying ? (
              <PauseCircleFilled style={{ fontSize: '64px' }} />
            ) : (
              <PlayCircleFilled style={{ fontSize: '64px' }} />
            )}
          </button>
          <button onClick={playNext} className="text-gray-300 hover:text-white transition-colors">
            <StepForwardOutlined style={{ fontSize: '24px' }} />
          </button>
          <button
            onClick={() => setRepeatMode()}
            className={`text-gray-400 hover:text-white transition-colors relative ${repeatMode !== 'none' ? 'text-green-500' : ''}`}
          >
            <Repeat size={20} />
            {repeatMode === 'one' && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                1
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center space-x-2 w-full max-w-md">
          <SoundOutlined />
          <Slider
            className="w-24"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={setVolume}
          />
        </div>
      </div>

      {/* Right Side: Lyrics */}
      <div className="w-1/2 flex flex-col p-8">
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="text-white">
            Lyrics
          </Title>
          <Button icon={<MoreOutlined />} type="text" className="text-gray-400 hover:text-white" />
        </div>
        <div
          ref={lyricsContainerRef}
          className="lyrics-container flex-grow overflow-y-auto pr-4 space-y-4"
        >
          {lyrics.length > 0 ? (
            lyrics.map((line, index) => (
              <p
                key={index}
                ref={index === activeLyricIndex ? activeLyricRef : null}
                className={`transition-all duration-300 text-2xl font-medium leading-relaxed ${index === activeLyricIndex ? 'text-white scale-105' : 'text-gray-500'}`}
              >
                {line.text}
              </p>
            ))
          ) : (
            return (
      <div className="p-4 flex-grow flex items-center justify-center">
        <Alert
          message={`Could Not Load Song - ID: ${id}`}
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
