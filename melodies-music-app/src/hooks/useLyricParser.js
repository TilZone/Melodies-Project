import { useMemo } from 'react';

// Regular expression to parse LRC format lines: [mm:ss.xx] lyric text
const LRC_LINE_REGEX = /^\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)$/;

/**
 * A custom hook to parse LRC format lyrics string.
 * It memoizes the result to avoid re-parsing on every render.
 * @param {string} lrcString - The raw LRC formatted string.
 * @returns {Array<{timestamp: number, text: string}>} An array of lyric objects.
 */
export const useLyricParser = (lrcString) => {
  const parsedLyrics = useMemo(() => {
    if (!lrcString) {
      return [];
    }

    const lines = lrcString.split('\n');
    const lyrics = [];

    for (const line of lines) {
      const match = line.match(LRC_LINE_REGEX);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const milliseconds = parseInt(match[3], 10);
        const text = match[4].trim();

        const timestamp = minutes * 60 + seconds + milliseconds / 1000;

        lyrics.push({ timestamp, text });
      }
    }

    // Sort lyrics by timestamp just in case the LRC file is not ordered
    return lyrics.sort((a, b) => a.timestamp - b.timestamp);
  }, [lrcString]);

  return parsedLyrics;
};
