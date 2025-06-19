import { getAvailableStartingLetters } from "../words/wordUtils.js";

export function tryPlaceHorizontal(
  grid,
  word,
  startPoint,
  cols,
  rows,
  wordsByLength,
  usedWords,
  placedIndices
) {
  const { row, col } = startPoint;

  // check if word fits horizontally
  if (col + word.length > cols) return false;

  // first pass - validate placement without modifying grid
  for (let i = 0; i < word.length; i++) {
    const index = row * cols + col + i;
    const cell = grid[index];
    const letter = word[i];

    // check if we hit a dot
    if (cell === ".") {
      return false;
    }

    // check if it's already a letter and doesn't match
    if (isNaN(cell) && cell !== letter) {
      return false;
    }

    // check if it's a number (starting point) other than the first position
    if (!isNaN(cell) && parseInt(cell) > 0 && i > 0) {
      // check if this letter can start a remaining word
      const availableStartingLetters = getAvailableStartingLetters(
        wordsByLength,
        usedWords
      );
      if (!availableStartingLetters.has(letter)) {
        return false;
      }
    }
  }

  // second pass - actually place the word
  for (let i = 0; i < word.length; i++) {
    const index = row * cols + col + i;
    if (grid[index] !== word[i]) {
      placedIndices.push(index);
      grid[index] = word[i];
    }
  }

  return true;
}

export function tryPlaceVertical(
  grid,
  word,
  startPoint,
  cols,
  rows,
  wordsByLength,
  usedWords,
  placedIndices
) {
  const { row, col } = startPoint;

  // check if word fits vertically
  if (row + word.length > rows) return false;

  // first pass - validate placement without modifying grid
  for (let i = 0; i < word.length; i++) {
    const index = (row + i) * cols + col;
    const cell = grid[index];
    const letter = word[i];

    // check if we hit a dot
    if (cell === ".") {
      return false;
    }

    // check if it's already a letter and doesn't match
    if (isNaN(cell) && cell !== letter) {
      return false;
    }

    // check if it's a number (starting point) other than the first position
    if (!isNaN(cell) && parseInt(cell) > 0 && i > 0) {
      // check if this letter can start a remaining word
      const availableStartingLetters = getAvailableStartingLetters(
        wordsByLength,
        usedWords
      );
      if (!availableStartingLetters.has(letter)) {
        return false;
      }
    }
  }

  // second pass - actually place the word
  for (let i = 0; i < word.length; i++) {
    const index = (row + i) * cols + col;
    if (grid[index] !== word[i]) {
      placedIndices.push(index);
      grid[index] = word[i];
    }
  }

  return true;
}

export function undoPlacement(grid, originalGrid, placedIndices) {
  for (let index of placedIndices) {
    grid[index] = originalGrid[index];
  }
}
