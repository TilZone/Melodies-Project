/**
 * Array Utility Functions
 */

/**
 * Shuffles an array in place using the Fisher-Yates (aka Knuth) algorithm.
 * This is an efficient and unbiased way to shuffle an array.
 * @param {Array} array The array to shuffle.
 * @returns {Array} The shuffled array.
 */
export const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};
