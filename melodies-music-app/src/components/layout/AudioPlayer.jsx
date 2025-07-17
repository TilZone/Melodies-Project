import { useRef, useEffect } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    setDuration,
    setCurrentTime,
    playNext,
    togglePlayPause,
  } = usePlayerStore();

  // Effect to synchronize the player's state (playing/paused) with the store.
  // This ensures that calling playSong() or pause() from anywhere updates the actual audio tag.
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          // Autoplay might be blocked by the browser.
          // We can optionally set isPlaying to false here.
          console.error('Playback error:', error);
          togglePlayPause(); // Revert the state if play fails
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, togglePlayPause]);

  // Effect to change the audio source when the song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl; // Make sure your song object has audioUrl
      if (isPlaying) {
        audioRef.current.play().catch((error) => console.error('Playback error:', error));
      }
    }
  }, [currentSong, isPlaying]);

  // Effect to update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Effect to seek to a specific time
  useEffect(() => {
    if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 1) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // Event listeners for the audio element
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      playNext();
    };

    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [setCurrentTime, setDuration, playNext]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
