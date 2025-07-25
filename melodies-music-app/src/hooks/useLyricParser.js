/**
 * Custom Hook for Parsing and Synchronizing LRC Lyrics
 *
 * This hook takes a raw LRC lyric string and the current playback time.
 * It performs two main functions:
 * 1. Parses the LRC string into a structured array of { time, text } objects.
 *    This parsing is memoized to only run when the lyric string changes.
 * 2. Determines the index of the currently active lyric line based on the
 *    playback time, allowing for karaoke-style highlighting.
 *
 * This encapsulates all lyric-related logic, keeping components clean.
 */
import { useMemo } from 'react';

const LRC_LINE_REGEX = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;

export const useLyricParser = (lrcString, currentTime) => {
  const lyrics = useMemo(() => {
    if (!lrcString) return [];

    return lrcString
      .split('\n')
      .map((line) => {
        const match = line.match(LRC_LINE_REGEX);
        if (!match) return null;

        const [, minutes, seconds, milliseconds, text] = match;
        const time =
          parseInt(minutes, 10) * 60 + parseInt(seconds, 10) + parseInt(milliseconds, 10) / 1000;

        return { time, text: text.trim() };
      })
      .filter(Boolean) // Remove any non-matching lines
      .sort((a, b) => a.time - b.time); // Ensure chronological order
  }, [lrcString]);

  const activeLyricIndex = useMemo(() => {
    if (!lyrics.length) return -1;

    // Find the last lyric line whose time is less than or equal to the current time.
    // This is more efficient than `findIndex` as it doesn't stop at the first match.
    let i = lyrics.length - 1;
    while (i >= 0) {
      if (lyrics[i].time <= currentTime) {
        return i;
      }
      i--;
    }
    return -1; // No line is active yet (e.g., intro of the song)
  }, [lyrics, currentTime]);

  return { lyrics, activeLyricIndex };
};
