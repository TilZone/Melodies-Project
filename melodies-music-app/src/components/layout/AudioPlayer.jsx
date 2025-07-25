import { useRef, useEffect, useState } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const {
    currentSong,
    isPlaying,
    volume,
    setDuration,
    setCurrentTime,
    setIsPlaying,
    handleSongEnded, // Use the correct action for when a song ends naturally
  } = usePlayerStore();

  const [currentAudioSrc, setCurrentAudioSrc] = useState(null);

  // Effect for handling song source changes
  useEffect(() => {
    if (!audioRef.current) return;

    console.log(
      'AudioPlayer: src useEffect triggered. currentSong:',
      currentSong?.title,
      'currentAudioSrc:',
      currentAudioSrc
    );

    if (currentSong?.audioUrl && currentSong.audioUrl !== currentAudioSrc) {
      console.log('AudioPlayer: Setting new audio src:', currentSong.audioUrl);
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load(); // Load the new audio
      setCurrentAudioSrc(currentSong.audioUrl);
    } else if (!currentSong?.audioUrl && currentAudioSrc) {
      // Clear src if no current song
      console.log('AudioPlayer: No current song. Clearing src.');
      audioRef.current.src = '';
      setCurrentAudioSrc(null);
    }
  }, [currentSong, currentAudioSrc]);

  // Effect to handle play/pause state
  useEffect(() => {
    if (!audioRef.current) return;

    console.log('AudioPlayer: play/pause useEffect triggered. isPlaying:', isPlaying);

    if (isPlaying) {
      audioRef.current.play().catch((e) => {
        console.error('AudioPlayer: Autoplay failed on play/pause useEffect:', e);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  // Effect to control audio volume.
  useEffect(() => {
    if (audioRef.current) {
      console.log('AudioPlayer: useEffect [volume] triggered. Volume:', volume);
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // --- Event Handlers for the <audio> element ---

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      // console.log('AudioPlayer: onTimeUpdate. Current time:', audioRef.current.currentTime);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      console.log('AudioPlayer: onLoadedMetadata. Duration:', audioRef.current.duration);
      setDuration(audioRef.current.duration);
      // If the player is supposed to be playing, start playback after metadata is loaded
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.error('AudioPlayer: Autoplay failed on loaded metadata:', e);
          setIsPlaying(false);
        });
      }
    }
  };

  const handleEnded = () => {
    handleSongEnded(); // Directly call the action from the store
  };

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
    />
  );
};

export default AudioPlayer;
