/**
 * Parses LRC formatted lyrics into an array of objects with time and text.
 * LRC format example: [mm:ss.xx]Lyric text here
 *
 * @param {string} lrcContent The LRC formatted lyric string.
 * @returns {Array<Object>} An array of lyric objects: { time: number, text: string }.
 */
export const parseLyrics = (lrcContent) => {
  const lines = lrcContent.split('\n');
  const parsedLyrics = [];

  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

  for (const line of lines) {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10);
      const time = (minutes * 60 + seconds) * 1000 + milliseconds; // Time in milliseconds
      const text = line.substring(match[0].length).trim();
      parsedLyrics.push({ time: time / 1000, text }); // Convert to seconds
    }
  }
  return parsedLyrics;
};
