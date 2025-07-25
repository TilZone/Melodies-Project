/**
 * Formats time in seconds to a MM:SS string.
 * @param {number} seconds - The total seconds to format.
 * @returns {string} The formatted time string (e.g., "03:21").
 */
export const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

/**
 * Formats a large number into a locale-specific string with commas.
 * e.g., 1234567 -> "1,234,567"
 * @param {number} count - The number to format.
 * @returns {string} The formatted number string.
 */
export const formatPlayCount = (count) => {
  if (isNaN(count) || count < 0) {
    return '0';
  }
  return new Intl.NumberFormat().format(count);
};
