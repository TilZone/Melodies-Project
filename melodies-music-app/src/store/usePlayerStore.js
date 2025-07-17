import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper function to shuffle an array
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      // --- STATE ---
      /** @type {object|null} The currently active song object. */
      currentSong: null,
      /** @type {boolean} The playing state of the audio. */
      isPlaying: false,
      /** @type {number} The current playback time of the audio in seconds. */
      currentTime: 0,
      /** @type {number} The total duration of the audio in seconds. */
      duration: 0,
      /** @type {number} The player volume, from 0 to 1. */
      volume: 0.75,
      /** @type {Array<object>} The list of songs to be played. */
      queue: [],
      /** @type {Array<object>} A copy of the original queue to restore from shuffle mode. */
      originalQueue: [],
      /** @type {boolean} The shuffle state. */
      isShuffled: false,
      /** @type {'none'|'one'|'all'} The repeat mode. */
      repeatMode: 'none', // 'none', 'one', 'all'

      // --- ACTIONS ---
      /**
       * Sets a new song to play and optionally a new queue.
       * If the clicked song is the same as the current one, it toggles play/pause.
       * @param {object} song - The song object to play.
       * @param {Array<object>} [newQueue] - Optional new queue to set.
       */

      playSong: (song, songQueue = []) => {
        const { currentSong, isPlaying, isShuffled } = get();

        // If the clicked song is the current song, just toggle play/pause
        if (currentSong && currentSong.id === song.id) {
          set({ isPlaying: !isPlaying });
          return;
        }

        // If it's a new song, proceed with setting up the queue and playing
        const newQueue = songQueue.length > 0 ? songQueue : [song];
        const original = [...newQueue];
        const currentQueue = isShuffled ? shuffle([...original]) : original;

        // Ensure the current song is at the top of the shuffled queue
        const currentIndex = currentQueue.findIndex((s) => s.id === song.id);
        if (currentIndex > 0) {
          [currentQueue[0], currentQueue[currentIndex]] = [
            currentQueue[currentIndex],
            currentQueue[0],
          ];
        }

        set({
          currentSong: song,
          isPlaying: true,
          currentTime: 0,
          duration: song.duration || 0, // Use actual duration from song object
          queue: currentQueue,
          originalQueue: original,
        });
      },

      setQueue: (songQueue) => {
        const { isShuffled } = get();
        const original = [...songQueue];
        const currentQueue = isShuffled ? shuffle([...original]) : original;
        set({
          queue: currentQueue,
          originalQueue: original,
        });
      },

      togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

      playNext: () => {
        const { queue, currentSong, repeatMode, isShuffled, originalQueue } = get();
        const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
        let nextIndex = currentIndex + 1;

        if (repeatMode === 'one') {
          set({ currentTime: 0, isPlaying: true }); // Replay current song
          return;
        }

        if (nextIndex >= queue.length) {
          if (repeatMode === 'all') {
            nextIndex = 0; // Loop back to the start
            if (isShuffled) {
              // Reshuffle the queue for the next loop
              const newShuffledQueue = shuffle([...originalQueue]);
              set({ queue: newShuffledQueue });
            }
          } else {
            set({ isPlaying: false }); // End of queue
            return;
          }
        }

        const nextSong = queue[nextIndex];
        if (nextSong) {
          get().playSong(nextSong, originalQueue);
        }
      },

      playPrevious: () => {
        const { queue, currentSong, originalQueue } = get();
        const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
        const prevIndex = currentIndex - 1;

        if (prevIndex >= 0) {
          const prevSong = queue[prevIndex];
          get().playSong(prevSong, originalQueue);
        }
      },

      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

      setCurrentTime: (time) => set({ currentTime: time }),

      setDuration: (duration) => set({ duration }),

      toggleShuffle: () => {
        const { isShuffled, originalQueue, currentSong } = get();
        const newQueue = !isShuffled ? shuffle([...originalQueue]) : [...originalQueue];

        // Keep the current song at the top after shuffling
        if (!isShuffled && currentSong) {
          const currentIndex = newQueue.findIndex((s) => s.id === currentSong.id);
          if (currentIndex !== -1) {
            [newQueue[0], newQueue[currentIndex]] = [newQueue[currentIndex], newQueue[0]];
          }
        }

        set({
          isShuffled: !isShuffled,
          queue: newQueue,
        });
      },

      setRepeatMode: (mode) => {
        const validModes = ['none', 'one', 'all'];
        if (validModes.includes(mode)) {
          set({ repeatMode: mode });
        } else {
          // Cycle through modes
          const { repeatMode } = get();
          const currentIndex = validModes.indexOf(repeatMode);
          const nextIndex = (currentIndex + 1) % validModes.length;
          set({ repeatMode: validModes[nextIndex] });
        }
      },
    }),
    {
      name: 'melodies-player-storage',
      partialize: (state) => ({
        // Only persist non-runtime state
        currentSong: state.currentSong,
        queue: state.queue,
        originalQueue: state.originalQueue,
        volume: state.volume,
        isShuffled: state.isShuffled,
        repeatMode: state.repeatMode,
        theme: state.theme,
      }),
    }
  )
);
