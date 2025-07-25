import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  Repeat,
  SkipBack,
  Pause,
  Play,
  List,
  SkipForward,
} from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { parseLyrics } from '../../utils/lyricParser'; // Assuming a utility for parsing LRC lyrics

const MobilePlayer = ({ onBack }) => {
  const { currentSong, isPlaying, currentTime, togglePlay, playNext, playPrevious } =
    usePlayerStore();

  const [isLyricsView] = useState(false);
  const [parsedLyrics, setParsedLyrics] = useState([]);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const lyricsContainerRef = useRef(null);

  useEffect(() => {
    if (currentSong?.lyrics) {
      setParsedLyrics(parseLyrics(currentSong.lyrics));
    }
  }, [currentSong]);

  useEffect(() => {
    if (!parsedLyrics.length) return;

    const currentLineIndex = parsedLyrics.findIndex((line, index) => {
      const nextLine = parsedLyrics[index + 1];
      return currentTime >= line.time && (nextLine ? currentTime < nextLine.time : true);
    });

    if (currentLineIndex !== activeLineIndex) {
      setActiveLineIndex(currentLineIndex);
      // Scroll to active line logic can be added here
    }
  }, [currentTime, parsedLyrics, activeLineIndex]);

  if (!currentSong) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-[#412C3A] to-[#0E1920]">
        <p className="text-white">No song selected.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen max-w-md mx-auto bg-gradient-to-r from-[#412C3A] to-[#0E1920] overflow-hidden text-white">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${currentSong.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(15px)',
        }}
      />

      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <button onClick={onBack}>
          <ArrowLeft className="w-9 h-9 text-[#0E9EEF]" strokeWidth={2} />
        </button>
        <div className="text-center">
          <span className="text-[#0E9EEF] font-bold text-3xl">Mu</span>
          <span className="text-[#EE10B0] font-bold text-3xl">sic</span>
        </div>
        <button>
          <MoreVertical className="w-9 h-9 text-[#EE10B0]" strokeWidth={3} />
        </button>
      </div>

      <div className="relative z-10 flex justify-center px-10 py-8">
        <img
          src={currentSong.thumbnail}
          alt={currentSong.title}
          className={`object-cover transition-all duration-500 ${isLyricsView ? 'w-48 h-48 rounded-full' : 'w-80 h-80 rounded-xl'}`}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 py-4">
        <div className="text-center mb-4">
          <h1
            className={`font-bold mb-1 transition-all duration-300 ${isLyricsView ? 'text-2xl text-[#EE10B0]' : 'text-3xl text-white'}`}
          >
            {currentSong.title}
          </h1>
          <p
            className={`font-bold transition-all duration-300 ${isLyricsView ? 'text-lg' : 'text-xl opacity-80'}`}
          >
            {currentSong.artist.name}
          </p>
        </div>
      </div>

      {isLyricsView ? (
        <div
          ref={lyricsContainerRef}
          className="relative z-10 px-6 py-4 flex-1 mb-8 max-h-64 overflow-y-auto scrollbar-hide"
        >
          <div className="text-center space-y-4">
            {parsedLyrics.map((line, index) => (
              <p
                key={index}
                className={`transition-colors duration-300 ${index === activeLineIndex ? 'text-white text-xl font-bold' : 'text-white/60'}`}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-32"></div> // Placeholder for spacing
      )}

      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 bg-black/20 backdrop-blur-sm pt-4">
        {/* Progress Bar could be added here */}
        <div className="flex items-center justify-between">
          <button className="p-2">
            <Repeat className="w-10 h-10 text-[#EE10B0]" strokeWidth={1.5} />
          </button>
          <button
            onClick={playPrevious}
            className="w-10 h-10 bg-[#630A4A]/50 rounded-full flex items-center justify-center"
          >
            <SkipBack className="w-4 h-4 text-[#EE10B0] fill-current" />
          </button>
          <button
            onClick={togglePlay}
            className="relative w-16 h-16 bg-[#630A4A] rounded-full flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF3780]/30 to-[#FB37FF]/30 blur-lg scale-110"></div>
            <div className="relative">
              {isPlaying ? (
                <Pause className="w-7 h-7 text-[#EE10B0] fill-current" />
              ) : (
                <Play className="w-7 h-7 text-[#EE10B0] fill-current ml-1" />
              )}
            </div>
          </button>
          <button
            onClick={playNext}
            className="w-10 h-10 bg-[#630A4A]/50 rounded-full flex items-center justify-center"
          >
            <SkipForward className="w-4 h-4 text-[#EE10B0] fill-current" />
          </button>
          <button className="p-2">
            <List className="w-10 h-10 text-[#EE10B0]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
