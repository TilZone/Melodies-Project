import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../store/usePlayerStore';
import {
  ArrowLeftOutlined,
  MoreOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  RetweetOutlined,
} from '@ant-design/icons';

const MusicPlayerPage = () => {
  const navigate = useNavigate();
  const { currentSong, isPlaying, playSong, pauseSong, nextSong, prevSong } = usePlayerStore();

  if (!currentSong) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-[#412C3A] to-[#0E1920] text-white">
        <p className="text-lg mb-4">No song is currently playing.</p>
        <button
          onClick={() => navigate('/discover')}
          className="bg-[#EE10B0] text-white px-6 py-2 rounded text-sm font-bold shadow-sm hover:bg-[#d10f9f] transition-colors"
        >
          Go to Discover
        </button>
      </div>
    );
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong(currentSong);
    }
  };

  // Mock waveform data for visual representation
  const waveformBars = Array.from({ length: 60 }, (_, i) => ({
    height: Math.floor(Math.random() * 40) + 5,
    color: i < 27 ? '#EE10B0' : '#FFF',
  }));

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#412C3A] to-[#0E1920] text-white relative overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentSong.coverArt})`,
          filter: 'blur(20px) brightness(0.5)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0">
          <ArrowLeftOutlined
            className="text-[#0E9EEF] text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold text-center">
            <span className="text-[#0E9EEF]">Now</span>
            <span className="text-[#EE10B0]">Playing</span>
          </h1>
          <MoreOutlined className="text-[#EE10B0] text-2xl cursor-pointer" />
        </header>

        <main className="flex-grow flex flex-col justify-center">
          {/* Album Cover */}
          <div className="flex justify-center px-6 mb-8">
            <div className="relative">
              <img
                src={currentSong.coverArt}
                alt={currentSong.title}
                className="w-52 h-52 rounded-full object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Song Info */}
          <div className="text-center px-6 mb-8">
            <h2
              className="text-3xl font-bold text-[#EE10B0] truncate"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              {currentSong.title}
            </h2>
            <p
              className="text-lg font-semibold opacity-90 truncate"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              {currentSong.artist?.name || 'Unknown Artist'}
            </p>
          </div>

          {/* Waveform/Progress */}
          <div className="px-7 mb-8">
            {/* TODO: Replace with actual song progress bar */}
            <div className="flex items-end justify-center gap-1 h-14">
              {waveformBars.map((bar, index) => (
                <div
                  key={index}
                  className="w-1 rounded-sm"
                  style={{ height: `${bar.height}px`, backgroundColor: bar.color, opacity: 0.8 }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span>0:00</span>
              <span>{currentSong.duration || '0:00'}</span>
            </div>
          </div>
        </main>

        {/* Music Controls */}
        <footer className="px-7 pb-8 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button className="p-2">
              <RetweetOutlined className="text-[#EE10B0] text-2xl" />
            </button>
            <button
              onClick={prevSong}
              className="w-12 h-12 bg-[#630A4A]/50 rounded-full flex items-center justify-center"
            >
              <StepBackwardOutlined className="text-[#EE10B0] text-xl" />
            </button>
            <button
              onClick={handlePlayPause}
              className="w-20 h-20 bg-[#EE10B0] rounded-full flex items-center justify-center shadow-lg"
            >
              {isPlaying ? (
                <PauseOutlined className="text-white text-4xl" />
              ) : (
                <PlayCircleOutlined className="text-white text-4xl" />
              )}
            </button>
            <button
              onClick={nextSong}
              className="w-12 h-12 bg-[#630A4A]/50 rounded-full flex items-center justify-center"
            >
              <StepForwardOutlined className="text-[#EE10B0] text-xl" />
            </button>
            <button className="p-2">
              {/* Placeholder for queue/playlist icon */}
              <svg className="w-8 h-8 text-[#EE10B0]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MusicPlayerPage;
