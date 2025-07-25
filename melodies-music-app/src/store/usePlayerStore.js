// Global player state store using Zustand. Manages playback, queue, and user settings.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shuffle as shuffleArray } from '../utils/array';

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      // --- STATE ---
      currentSong: null,
      isPlaying: false,
      volume: 0.75,
      isShuffled: false,
      repeatMode: 'none', // 'none', 'all', 'one'
      queue: [],
      originalQueue: [],
      currentTime: 0,
      duration: 0,
      theme: 'dark',

      // --- ACTIONS ---

      // --- ACTIONS ---

      // Sets the current song and starts playback.
      // If newQueue is provided, it updates the entire queue.
      // If not, it tries to find the song in the existing originalQueue or creates a new one.
      playSong: (song, newQueue = null, startIndex = 0) => {
        set((state) => {
          let songToPlay = song; // The song that will actually be played
          let updatedQueue = state.queue;
          let updatedOriginalQueue = state.originalQueue;

          console.log('playSong called:', { song, newQueue, startIndex });

          if (newQueue) {
            // If a new queue is provided, set it
            updatedOriginalQueue = [...newQueue];
            songToPlay = newQueue[startIndex]; // Use the song at startIndex from the newQueue

            if (state.isShuffled) {
              updatedQueue = shuffleArray([...newQueue]);
              // Ensure the selected song (songToPlay) is at the start of the shuffled queue
              const index = updatedQueue.findIndex((s) => s._id === songToPlay._id);
              if (index > 0) {
                const [found] = updatedQueue.splice(index, 1);
                updatedQueue.unshift(found);
              }
            } else {
              updatedQueue = [...newQueue];
            }
          } else if (!state.originalQueue.some((s) => s._id === song.id)) {
            // If no new queue and song is not in current originalQueue, create a new single-song queue
            updatedOriginalQueue = [song];
            updatedQueue = [song];
          } else {
            // If song is already in originalQueue, just update currentSong and ensure queue is consistent
            if (state.isShuffled) {
              // If shuffled, ensure the selected song is at the start of the current queue
              const index = updatedQueue.findIndex((s) => s._id === songToPlay._id);
              if (index > 0) {
                const [found] = updatedQueue.splice(index, 1);
                updatedQueue.unshift(found);
              }
            }
          }

          console.log('playSong returning:', {
            currentSong: songToPlay,
            queue: updatedQueue,
            originalQueue: updatedOriginalQueue,
          });

          return {
            currentSong: songToPlay,
            isPlaying: true,
            currentTime: 0,
            duration: songToPlay?.duration || 0,
            queue: updatedQueue,
            originalQueue: updatedOriginalQueue,
          };
        });
      },

      // Sets the entire queue and the current song from that queue.
      setQueue: (newQueue, startIndex = 0) => {
        set((state) => {
          const song = newQueue[startIndex];
          const original = [...newQueue]; // Always store a copy of the original order
          let current = [...newQueue];

          // If shuffled, ensure the selected song is at the start of the current queue
          if (state.isShuffled && song) {
            current = shuffleArray([...original]);
            const index = current.findIndex((s) => s._id === song._id);
            if (index > 0) {
              const [found] = current.splice(index, 1);
              current.unshift(found);
            }
          }

          return {
            currentSong: song,
            isPlaying: true,
            currentTime: 0,
            duration: song?.duration || 0,
            queue: current,
            originalQueue: original, // Always store the original order
          };
        });
      },

      togglePlayPause: () => {
        set((state) => {
          if (!state.currentSong) return {};
          console.log('togglePlayPause:', !state.isPlaying);
          return { isPlaying: !state.isPlaying };
        });
      },

      skipToNext: () => {
        set((state) => {
          console.log(
            'skipToNext: Initial state check - currentSong:',
            state.currentSong?.title,
            'queue length:',
            state.queue.length
          );
          if (!state.currentSong || state.queue.length === 0) {
            console.log('skipToNext: No current song or empty queue');
            return {};
          }
          const { queue, repeatMode } = state;
          const currentIndex = queue.findIndex((s) => s._id === state.currentSong._id);

          console.log('skipToNext: currentSong', state.currentSong.title);
          console.log(
            'skipToNext: queue',
            queue.map((s) => s.title)
          );
          console.log('skipToNext: currentIndex', currentIndex);

          let nextSong = null;
          let newIsPlaying = state.isPlaying;

          if (currentIndex === -1) {
            // Current song not found in queue, play the first song if available
            nextSong = queue[0];
            console.log('skipToNext: Current song not found, playing first in queue');
          } else {
            const isLastSong = currentIndex === queue.length - 1;

            if (isLastSong) {
              if (repeatMode === 'all') {
                nextSong = queue[0]; // Loop back to the first song
                console.log('skipToNext: Last song, repeating all');
              } else if (repeatMode === 'one') {
                nextSong = state.currentSong; // Stay on the current song
                console.log('skipToNext: Last song, repeating one');
              } else {
                newIsPlaying = false; // Stop playback if no repeat and last song
                console.log('skipToNext: Last song, stopping playback');
              }
            } else {
              nextSong = queue[currentIndex + 1];
              console.log('skipToNext: Playing next song in queue');
            }
          }

          console.log('skipToNext: nextSong', nextSong?.title, 'newIsPlaying', newIsPlaying);

          if (nextSong) {
            return { currentSong: nextSong, currentTime: 0, isPlaying: newIsPlaying };
          } else {
            return { isPlaying: newIsPlaying };
          }
        });
      },

      skipToPrevious: () => {
        set((state) => {
          console.log(
            'skipToPrevious: Initial state check - currentSong:',
            state.currentSong?.title,
            'queue length:',
            state.queue.length
          );
          if (!state.currentSong || state.queue.length === 0) {
            console.log('skipToPrevious: No current song or empty queue');
            return {};
          }
          // If current song has played for more than 3 seconds, restart it
          if (state.currentTime > 3) {
            console.log('skipToPrevious: Restarting current song (currentTime > 3s)');
            return { currentTime: 0 };
          }

          const { queue, repeatMode } = state;
          const currentIndex = queue.findIndex((s) => s._id === state.currentSong._id);

          console.log('skipToPrevious: currentSong', state.currentSong.title);
          console.log(
            'skipToPrevious: queue',
            queue.map((s) => s.title)
          );
          console.log('skipToPrevious: currentIndex', currentIndex);

          let previousSong = null;
          let newIsPlaying = state.isPlaying;

          if (currentIndex === -1) {
            // Current song not found in queue, play the last song if available
            previousSong = queue[queue.length - 1];
            console.log('skipToPrevious: Current song not found, playing last in queue');
          } else {
            const isFirstSong = currentIndex === 0;

            if (isFirstSong) {
              if (repeatMode === 'all') {
                previousSong = queue[queue.length - 1]; // Loop back to the last song
                console.log('skipToPrevious: First song, repeating all');
              } else if (repeatMode === 'one') {
                previousSong = state.currentSong; // Stay on the current song
                console.log('skipToPrevious: First song, repeating one');
              } else {
                newIsPlaying = false; // Stop playback if no repeat and first song
                console.log('skipToPrevious: First song, stopping playback');
              }
            } else {
              previousSong = queue[currentIndex - 1];
              console.log('skipToPrevious: Playing previous song in queue');
            }
          }

          console.log(
            'skipToPrevious: previousSong',
            previousSong?.title,
            'newIsPlaying',
            newIsPlaying
          );

          if (previousSong) {
            return { currentSong: previousSong, currentTime: 0, isPlaying: newIsPlaying };
          } else {
            return { isPlaying: newIsPlaying };
          }
        });
      },

      handleSongEnded: () => {
        const { repeatMode, currentSong } = get();
        console.log('handleSongEnded: repeatMode', repeatMode, 'currentSong', currentSong?.title);
        if (repeatMode === 'one') {
          set({ currentTime: 0, isPlaying: true });
          console.log('handleSongEnded: Repeating current song');
        } else {
          get().skipToNext();
          console.log('handleSongEnded: Skipping to next song');
        }
      },

      toggleShuffle: () => {
        set((state) => {
          const { isShuffled, originalQueue, currentSong } = state;
          const newIsShuffled = !isShuffled;

          console.log('toggleShuffle: newIsShuffled', newIsShuffled);

          if (newIsShuffled) {
            let shuffledQueue = [...originalQueue]; // Start with a copy of the original queue

            if (currentSong) {
              // Remove current song from its original position
              const currentSongIndex = shuffledQueue.findIndex((s) => s._id === currentSong._id);
              if (currentSongIndex !== -1) {
                shuffledQueue.splice(currentSongIndex, 1);
              }
              // Shuffle the rest of the queue
              shuffledQueue = shuffleArray(shuffledQueue);
              // Add current song back to the beginning
              shuffledQueue.unshift(currentSong);
            } else {
              // If no current song, just shuffle the whole original queue
              shuffledQueue = shuffleArray(shuffledQueue);
            }
            console.log(
              'toggleShuffle: new queue (shuffled)',
              shuffledQueue.map((s) => s.title)
            );
            return { queue: shuffledQueue, isShuffled: true };
          } else {
            // If turning shuffle off, revert to original queue
            console.log(
              'toggleShuffle: new queue (original)',
              originalQueue.map((s) => s.title)
            );
            return { queue: [...originalQueue], isShuffled: false };
          }
        });
      },

      cycleRepeatMode: () => {
        const modes = ['none', 'all', 'one'];
        set((state) => {
          const currentIndex = modes.indexOf(state.repeatMode);
          const nextMode = modes[(currentIndex + 1) % modes.length];
          return { repeatMode: nextMode };
        });
      },

      // --- SETTERS (for direct state manipulation, use with caution) ---
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setVolume: (volume) => set({ volume }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      updateCurrentSongOnly: (song) => {
        set({
          currentSong: song,
          duration: song?.duration || 0,
        });
      },
    }),
    {
      name: 'melodies-player-storage',
      partialize: (state) => ({
        volume: state.volume,
        isShuffled: state.isShuffled,
        repeatMode: state.repeatMode,
        theme: state.theme,
        // Do not persist currentSong and queue directly to avoid stale state
        // These will be re-initialized or fetched on app load
      }),
      onRehydrateStorage: (state) => {
        // After rehydration, ensure playback is paused and time is reset
        if (state) {
          state.isPlaying = false;
          state.currentTime = 0;
        }
      },
    }
  )
);
