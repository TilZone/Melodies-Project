// src/components/layout/Player.jsx
import { useEffect, useRef } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';

const Player = () => {
  const audioRef = useRef(null);
  const { currentSong, isPlaying, volume, pauseSong, setCurrentTime, setDuration } =
    usePlayerStore();

  // Effect to handle play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((e) => console.error('Error playing audio:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // Effect to handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    // For now, just pause. Later, you can add logic for playlists (play next song).
    pauseSong();
  };

  // Render the audio element only if there's a song to play
  return currentSong && currentSong.audioUrl ? (
    <audio
      ref={audioRef}
      src={currentSong.audioUrl}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
      onError={(e) => console.error('Audio player error:', e)}
    />
  ) : null;
};

export default Player;
