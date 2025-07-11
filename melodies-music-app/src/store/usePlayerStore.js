import { create } from 'zustand';

// Global store for music player state and actions
export const usePlayerStore = create((set) => ({
  currentSong: null, // Currently playing song object
  isPlaying: false, // Playback state
  volume: 0.7, // Volume (0.0 - 1.0)
  progress: 0, // Playback progress percentage
  duration: 0, // Song duration in seconds
  currentTime: 0, // Current playback time in seconds

  // Start playing a song
  playSong: (song) =>
    set({
      currentSong: song,
      isPlaying: true,
      progress: 0,
      currentTime: 0,
      duration: 200,
    }),
  // Pause playback
  pauseSong: () => set({ isPlaying: false }),
  // Toggle play/pause
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  // Set volume
  setVolume: (volume) => set({ volume }),
  // Set playback progress
  setProgress: (progress) => set({ progress }),
  // Set current playback time
  setCurrentTime: (time) => set({ currentTime: time }),
}));
