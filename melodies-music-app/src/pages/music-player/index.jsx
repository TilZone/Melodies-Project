import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Alert, Spin, Slider } from 'antd';
import { fetchSongById } from '../../services/song.service';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useLyricParser } from '../../hooks/useLyricParser';
import { formatDuration } from '../../utils/formatters';
import { cn } from '../../lib/utils';
import {
  ArrowLeft,
  MoreVertical,
  Heart,
  Repeat,
  SkipBack,
  Pause,
  Play,
  SkipForward,
  Shuffle,
  Music,
  ListMusic,
} from 'lucide-react';

// --- Main Music Player Page Component ---

const MusicPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Global state from Zustand
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isShuffled,
    repeatMode,
    playSong,
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    setCurrentTime,
    toggleShuffle,
    cycleRepeatMode,
    queue: rawQueue, // Get the raw queue from the store
  } = usePlayerStore();

  const queue = Array.isArray(rawQueue) ? rawQueue : []; // Ensure queue is always an array

  // Local state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLyricsView, setIsLyricsView] = useState(false); // State to toggle between song and lyrics view
  const [showQueue, setShowQueue] = useState(false); // New state to toggle queue display

  // Lyric parsing and synchronization
  const lyricsContainerRef = useRef(null);
  const { lyrics, activeLyricIndex } = useLyricParser(currentSong?.lyrics || '', currentTime);

  // Fetch song data and initialize player state
  useEffect(() => {
    const loadSongAndPlay = async () => {
      if (!id) return; // No ID, nothing to load

      // If the song in the store already matches the URL ID, do nothing.
      // This prevents re-fetching when currentSong changes due to player controls.
      if (currentSong && currentSong._id === id) {
        setLoading(false); // Ensure loading state is false if already loaded
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const fetchedSong = await fetchSongById(id);
        const { queue: initialQueue, startIndex: initialStartIndex } = location.state || {};
        let queueToUse = initialQueue;
        let startIndexToUse = initialStartIndex;

        if (!queueToUse || queueToUse.length === 0) {
          queueToUse = [fetchedSong];
          startIndexToUse = 0;
        }
        playSong(fetchedSong, queueToUse, startIndexToUse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSongAndPlay();
  }, [id, playSong, location.state, currentSong]);

  // Auto-scroll lyrics
  useEffect(() => {
    if (isLyricsView && activeLyricIndex >= 0 && lyricsContainerRef.current) {
      const activeLine = lyricsContainerRef.current.children[activeLyricIndex];
      if (activeLine) {
        activeLine.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [activeLyricIndex, isLyricsView]);

  const handleSeek = (value) => {
    setCurrentTime(value);
  };

  const handleQueueItemClick = (songToPlay) => {
    const songIndex = queue.findIndex((song) => song._id === songToPlay._id);
    playSong(songToPlay, queue, songIndex);
  };

  // Mock waveform data for visual representation
  const waveformBars = Array.from({ length: 60 }, (_, i) => {
    const heights = [
      35, 53, 35, 15, 53, 31, 15, 31, 53, 15, 41, 27, 53, 41, 27, 41, 17, 53, 41, 27, 27, 41, 15,
      47, 37, 23, 15, 37, 47, 37, 47, 23, 23, 47, 37, 23, 15, 47, 23, 37, 15, 15, 23, 23, 15, 37,
      37, 23, 37, 15, 23, 37, 23, 15, 15, 23, 37, 23, 15, 23,
    ];
    const isPink = i < 27; // Example: first 27 bars are pink
    return {
      height: heights[i] || 15,
      color: isPink ? '#EE10B0' : '#FFFFFF',
    };
  });

  // --- Render Logic ---

  if (loading && !currentSong) {
    // Only show loading if no song is currently loaded
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#412C3A] to-[#0E1920]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    // Show error if there's an error
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#412C3A] to-[#0E1920] p-4">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!currentSong) {
    // If no song is loaded and no error, display a message
    return <div className="text-center text-gray-500 p-8">No song is currently playing.</div>;
  }

  // Use currentSong directly for display
  const songToDisplay = currentSong;

  return (
    <div className="relative w-full min-h-screen max-w-md mx-auto lg:max-w-full bg-gradient-to-b from-[#412C3A] to-[#0E1920] text-white overflow-hidden lg:flex z-10">
      {' '}
      {/* Added z-10 here */}
      {/* Background Album Art (Blurred) */}
      <div
        className="absolute inset-0 opacity-30 z-0"
        style={{
          backgroundImage: `url(${songToDisplay.coverArt})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(15px)',
        }}
      />
      {/* Mobile Header - Hidden on desktop */}
      <div className="lg:hidden relative z-10 flex items-center justify-between px-6 pt-4 pb-2">
        <div className="text-white text-sm font-medium">10:00</div>
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-300"></div>
        </div>
      </div>
      {/* Navigation - Mobile only */}
      <div className="lg:hidden relative z-10 flex items-center justify-between px-6 py-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-9 h-9 text-[#0E9EEF]" strokeWidth={2} />
        </button>
        <div className="text-center">
          <span className="text-[#0E9EEF] font-vazirmatn font-bold text-3xl">Mu</span>
          <span className="text-[#EE10B0] font-vazirmatn font-bold text-3xl">sic</span>
        </div>
        <button className="p-2">
          <MoreVertical className="w-9 h-9 text-[#EE10B0]" strokeWidth={3} />
        </button>
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1 flex-col relative z-20">
        {' '}
        {/* z-20 already here */}
        {/* Desktop Header (Placeholder for now, usually handled by MainLayout) */}
        <header className="flex items-center justify-between p-6">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="w-8 h-8 text-white" />
          </button>
          <div className="flex items-center space-x-8">
            <a href="#" className="text-white text-lg font-semibold hover:text-[#0E9EEF]">
              Share
            </a>
            <a href="#" className="text-white text-lg font-semibold hover:text-[#0E9EEF]">
              About
            </a>
            <a href="#" className="text-white text-lg font-semibold hover:text-[#0E9EEF]">
              Premium
            </a>
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            {/* Placeholder for user avatar/icon */}
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </header>
        {/* Main Content for Desktop */}
        <div className="flex flex-1">
          {/* Left Column: Album Art & Controls */}
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <div className="relative w-96 h-96 mb-8">
              <img
                src={songToDisplay.coverArt}
                alt={songToDisplay.title}
                className="w-full h-full object-cover rounded-xl shadow-2xl shadow-black/50"
              />
            </div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white truncate">{songToDisplay.title}</h1>
              <p className="text-gray-300 text-xl truncate">{songToDisplay.artist.name}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-lg px-6">
              <Slider
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                tooltip={{ formatter: formatDuration }}
                styles={{
                  track: { backgroundColor: '#EE10B0', height: 6 },
                  rail: { backgroundColor: 'rgba(255, 255, 255, 0.2)', height: 6 },
                  handle: {
                    backgroundColor: 'white',
                    border: '2px solid #EE10B0',
                    width: 16,
                    height: 16,
                    marginTop: -5,
                  },
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatDuration(currentTime)}</span>
                <span>{formatDuration(duration)}</span>
              </div>
            </div>

            {/* Media Controls */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <button onClick={toggleShuffle} className="p-2">
                <Shuffle
                  className={`w-8 h-8 transition-colors ${isShuffled ? 'text-pink-500' : 'text-gray-400'}`}
                />
              </button>
              <button onClick={skipToPrevious} className="p-2">
                <SkipBack className="w-12 h-12 text-white" fill="currentColor" />
              </button>
              <button
                onClick={togglePlayPause}
                className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12 text-white" fill="currentColor" />
                ) : (
                  <Play className="w-12 h-12 text-white" fill="currentColor" />
                )}
              </button>
              <button onClick={skipToNext} className="p-2">
                <SkipForward className="w-12 h-12 text-white" fill="currentColor" />
              </button>
              <button onClick={cycleRepeatMode} className="p-2">
                <Repeat
                  className={`w-8 h-8 transition-colors ${repeatMode !== 'none' ? 'text-pink-500' : 'text-gray-400'}`}
                />
                {repeatMode === 'one' && (
                  <div className="absolute text-pink-500 text-xs font-bold -bottom-1 right-1">
                    1
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Lyrics / Queue */}
          <div className="w-1/2 flex flex-col p-8 relative z-20">
            {' '}
            {/* z-20 already here */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <button
                onClick={() => {
                  setIsLyricsView(false);
                  setShowQueue(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${!isLyricsView && !showQueue ? 'bg-pink-500 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                <Music className="w-5 h-5" />
                <span>Song</span>
              </button>
              <button
                onClick={() => {
                  setIsLyricsView(true);
                  setShowQueue(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isLyricsView ? 'bg-pink-500 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                <ListMusic className="w-5 h-5" />
                <span>Lyrics</span>
              </button>
              <button
                onClick={() => {
                  setShowQueue(!showQueue);
                  setIsLyricsView(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${showQueue ? 'bg-pink-500 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                <ListMusic className="w-5 h-5" />
                <span>Queue</span>
              </button>
            </div>
            {/* Lyrics Display */}
            {isLyricsView && (
              <div className="flex-1 overflow-y-auto text-center" ref={lyricsContainerRef}>
                {Array.isArray(lyrics) && lyrics.length > 0 ? (
                  lyrics.map((line, index) => (
                    <p
                      key={index}
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        index === activeLyricIndex ? 'text-pink-500' : 'text-gray-400'
                      }`}
                    >
                      {line.text}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-400">No lyrics available.</p>
                )}
              </div>
            )}
            {/* Queue Display */}
            {showQueue && (
              <div className="flex-1 overflow-y-auto">
                <h3 className="text-lg font-bold text-white mb-4">Current Queue</h3>
                {queue?.length > 0 ? (
                  <ul className="space-y-2">
                    {queue.map((song, index) => (
                      <li
                        key={song._id}
                        onClick={() => handleQueueItemClick(song)}
                        className={`text-gray-400 cursor-pointer p-2 rounded-md hover:bg-white/10 transition-colors ${currentSong?._id === song._id ? 'text-pink-500 font-bold' : ''}`}
                      >
                        {index + 1}. {song.title} - {song.artist?.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">Queue is empty.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col flex-1 relative z-20">
        {' '}
        {/* z-20 already here */}
        {/* Album Art */}
        <div className="relative z-10 flex justify-center px-10 py-8">
          <div
            className={cn(
              'relative transition-all duration-500',
              isLyricsView ? 'w-48 h-48' : 'w-80 h-80'
            )}
          >
            <img
              src={songToDisplay.coverArt}
              alt={songToDisplay.title}
              className={cn(
                'w-full h-full object-cover transition-all duration-500',
                isLyricsView ? 'rounded-full' : 'rounded-xl'
              )}
            />

            {/* Circular glow effect for lyrics view */}
            {isLyricsView && (
              <div className="absolute -inset-8 opacity-60">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-[#FF3780]/30 to-[#FB37FF]/30 blur-lg"></div>
              </div>
            )}
          </div>
        </div>
        {/* Song Info */}
        <div className="relative z-10 flex flex-col items-center px-6 py-4">
          <div className="text-center mb-4">
            <h1
              className={cn(
                'font-vazirmatn font-bold mb-1',
                isLyricsView ? 'text-2xl text-[#EE10B0] drop-shadow-lg' : 'text-3xl text-white'
              )}
            >
              {songToDisplay.title}
            </h1>
            <p
              className={cn(
                'font-vazirmatn font-bold opacity-90',
                isLyricsView ? 'text-lg text-white drop-shadow-lg' : 'text-xl text-white opacity-80'
              )}
            >
              {songToDisplay.artist.name}
            </p>
          </div>
        </div>
        {!isLyricsView && !showQueue && (
          <>
            {/* Progress Bar */}
            <div className="relative z-10 px-10 pb-6">
              <Slider
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                tooltip={{ formatter: formatDuration }}
                styles={{
                  track: { backgroundColor: '#EE10B0', height: 6 },
                  rail: { backgroundColor: 'rgba(255, 255, 255, 0.2)', height: 6 },
                  handle: {
                    backgroundColor: 'white',
                    border: '2px solid #EE10B0',
                    width: 16,
                    height: 16,
                    marginTop: -5,
                  },
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatDuration(currentTime)}</span>
                <span>{formatDuration(duration)}</span>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="relative z-10 px-6 py-6">
              <div className="flex items-end gap-0.5 h-14 justify-center">
                {waveformBars.map((bar, index) => (
                  <div
                    key={index}
                    className="w-1 rounded-sm transition-all duration-300"
                    style={{
                      height: `${bar.height}px`,
                      backgroundColor: bar.color,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Media Controls */}
            <div className="relative z-10 px-6 pb-8">
              <div className="flex items-center justify-between">
                {/* Repeat Button */}
                <button onClick={cycleRepeatMode} className="p-2">
                  <Repeat
                    className={`w-10 h-10 transition-colors ${repeatMode !== 'none' ? 'text-[#EE10B0]' : 'text-gray-400'}`}
                    strokeWidth={1.5}
                  />
                  {repeatMode === 'one' && (
                    <div className="absolute text-[#EE10B0] text-xs font-bold -bottom-1 right-1">
                      1
                    </div>
                  )}
                </button>

                {/* Previous Button */}
                <button
                  onClick={skipToPrevious}
                  className="w-10 h-10 bg-[#630A4A] rounded-full flex items-center justify-center"
                >
                  <SkipBack className="w-4 h-4 text-[#EE10B0] fill-current" />
                </button>

                {/* Play/Pause Button with Glow */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF3780]/30 to-[#FB37FF]/30 blur-lg scale-110"></div>
                  <button
                    onClick={togglePlayPause}
                    className="relative w-16 h-16 bg-[#630A4A] rounded-full flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 text-[#EE10B0] fill-current" />
                    ) : (
                      <Play className="w-7 h-7 text-[#EE10B0] fill-current" />
                    )}
                  </button>
                </div>

                {/* Next Button */}
                <button
                  onClick={skipToNext}
                  className="w-10 h-10 bg-[#630A4A] rounded-full flex items-center justify-center"
                >
                  <SkipForward className="w-4 h-4 text-[#EE10B0] fill-current" />
                </button>

                {/* Shuffle Button */}
                <button onClick={toggleShuffle} className="p-2">
                  <Shuffle
                    className={`w-10 h-10 transition-colors ${isShuffled ? 'text-[#EE10B0]' : 'text-gray-400'}`}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {/* Heart Icon (only in main view) */}
              <div className="flex justify-end mt-4 pr-4">
                <button>
                  <Heart className="w-10 h-10 text-white" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </>
        )}
        {/* Lyrics Display (only in lyrics view) */}
        {isLyricsView && (
          <div className="relative z-10 px-6 py-4 flex-1 mb-8">
            <div
              className="text-center space-y-3 max-h-64 overflow-y-auto"
              ref={lyricsContainerRef}
            >
              {Array.isArray(lyrics) && lyrics.length > 0 ? (
                lyrics.map((line, index) => (
                  <p
                    key={index}
                    className={`text-lg font-semibold transition-colors duration-300 ${
                      index === activeLyricIndex ? 'text-[#EE10B0]' : 'text-white/60'
                    }`}
                  >
                    {line.text}
                  </p>
                ))
              ) : (
                <p className="text-gray-400">No lyrics available.</p>
              )}
            </div>
          </div>
        )}
        {/* Queue Display */}
        {showQueue && (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <h3 className="text-lg font-bold text-white mb-4">Current Queue</h3>
            {queue.length > 0 ? (
              <ul className="space-y-2">
                {queue.map((song, index) => (
                  <li
                    key={song._id}
                    onClick={() => handleQueueItemClick(song)}
                    className={`text-gray-400 cursor-pointer p-2 rounded-md hover:bg-white/10 transition-colors ${currentSong?._id === song._id ? 'text-[#EE10B0] font-bold' : ''}`}
                  >
                    {index + 1}. {song.title} - {song.artist?.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">Queue is empty.</p>
            )}
          </div>
        )}
        {/* Toggle Buttons for Mobile (bottom of screen) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0E1920] border-t border-gray-700 p-4 z-30">
          {' '}
          <div className="flex justify-around items-center">
            <button
              onClick={() => {
                setIsLyricsView(false);
                setShowQueue(false);
              }}
              className={`flex flex-col items-center gap-1 ${!isLyricsView && !showQueue ? 'text-[#EE10B0]' : 'text-gray-400'}`}
            >
              <Music className="w-6 h-6" />
              <span className="text-xs">Song</span>
            </button>
            <button
              onClick={() => {
                setIsLyricsView(true);
                setShowQueue(false);
              }}
              className={`flex flex-col items-center gap-1 ${isLyricsView ? 'text-[#EE10B0]' : 'text-gray-400'}`}
            >
              <ListMusic className="w-6 h-6" />
              <span className="text-xs">Lyrics</span>
            </button>
            <button
              onClick={() => {
                setShowQueue(!showQueue);
                setIsLyricsView(false);
              }}
              className={`flex flex-col items-center gap-1 ${showQueue ? 'text-[#EE10B0]' : 'text-gray-400'}`}
            >
              <ListMusic className="w-6 h-6" />
              <span className="text-xs">Queue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerPage;
