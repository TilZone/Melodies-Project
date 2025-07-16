/**
 * Formats time in seconds to a MM:SS string.
 * @param {number} seconds - The total seconds to format.
 * @returns {string} The formatted time string (e.g., "03:21").
 */
export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
