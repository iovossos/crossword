import {
  calculateHorizontalSlotLength,
  calculateVerticalSlotLength,
} from "../grid/gridUtils.js";

export function findStartingPoints1D(grid, rows, cols) {
  const startingPoints = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      const cell = grid[index];
      if (!isNaN(cell) && parseInt(cell) > 0) {
        const horizontalSlotLength = calculateHorizontalSlotLength(
          grid,
          row,
          col,
          rows,
          cols
        );
        const verticalSlotLength = calculateVerticalSlotLength(
          grid,
          row,
          col,
          rows,
          cols
        );

        startingPoints.push({
          row: row,
          col: col,
          index: index,
          count: parseInt(cell),
          horizontalSlotLength: horizontalSlotLength,
          verticalSlotLength: verticalSlotLength,
          horizontalWord: null,
          verticalWord: null,
        });
      }
    }
  }

  return startingPoints;
}

export function groupWordsByLength(words) {
  const wordsByLength = {};
  for (let word of words) {
    if (!wordsByLength[word.length]) {
      wordsByLength[word.length] = [];
    }
    wordsByLength[word.length].push(word);
  }
  return wordsByLength;
}

export function validateWordLengthsMatch(startingPoints, words) {
  const requiredLengths = new Set();

  for (let sp of startingPoints) {
    if (sp.horizontalSlotLength > 1) {
      requiredLengths.add(sp.horizontalSlotLength);
    }
    if (sp.verticalSlotLength > 1) {
      requiredLengths.add(sp.verticalSlotLength);
    }
  }

  const availableLengths = new Set(words.map((w) => w.length));

  for (let length of requiredLengths) {
    if (!availableLengths.has(length)) {
      return false; // no word available for required length
    }
  }
  return true;
}

export function findWordPairsForStartingPoint(
  startPoint,
  wordsByLength,
  usedWords
) {
  const pairs = [];

  // only look at words of the correct lengths
  const horizontalWords = wordsByLength[startPoint.horizontalSlotLength] || [];
  const verticalWords = wordsByLength[startPoint.verticalSlotLength] || [];

  const availableHorizontal = horizontalWords.filter((w) => !usedWords.has(w));
  const availableVertical = verticalWords.filter((w) => !usedWords.has(w));

  // group words by starting letter for efficient pairing
  const horizontalByLetter = {};
  const verticalByLetter = {};

  for (let word of availableHorizontal) {
    const firstLetter = word[0];
    if (!horizontalByLetter[firstLetter]) {
      horizontalByLetter[firstLetter] = [];
    }
    horizontalByLetter[firstLetter].push(word);
  }

  for (let word of availableVertical) {
    const firstLetter = word[0];
    if (!verticalByLetter[firstLetter]) {
      verticalByLetter[firstLetter] = [];
    }
    verticalByLetter[firstLetter].push(word);
  }

  // find pairs with same starting letter
  for (let letter in horizontalByLetter) {
    if (verticalByLetter[letter]) {
      for (let hWord of horizontalByLetter[letter]) {
        for (let vWord of verticalByLetter[letter]) {
          if (hWord !== vWord) {
            pairs.push({ horizontal: hWord, vertical: vWord });
          }
        }
      }
    }
  }

  return pairs;
}

export function findWordsForSlot(startPoint, wordsByLength, usedWords) {
  const matches = [];

  // only check words of the exact required length
  if (startPoint.horizontalSlotLength > 1 && canStartHorizontal(startPoint)) {
    const horizontalWords =
      wordsByLength[startPoint.horizontalSlotLength] || [];
    const availableHorizontal = horizontalWords.filter(
      (w) => !usedWords.has(w)
    );
    for (let word of availableHorizontal) {
      matches.push({ word, direction: "horizontal" });
    }
  }

  if (startPoint.verticalSlotLength > 1 && canStartVertical(startPoint)) {
    const verticalWords = wordsByLength[startPoint.verticalSlotLength] || [];
    const availableVertical = verticalWords.filter((w) => !usedWords.has(w));
    for (let word of availableVertical) {
      matches.push({ word, direction: "vertical" });
    }
  }

  return matches;
}

export function getAvailableStartingLetters(wordsByLength, usedWords) {
  const startingLetters = new Set();
  for (let length in wordsByLength) {
    for (let word of wordsByLength[length]) {
      if (!usedWords.has(word)) {
        startingLetters.add(word[0]);
      }
    }
  }
  return startingLetters;
}

export function canStartHorizontal(startPoint) {
  return (
    !(startPoint.count === 1 && startPoint.verticalWord !== null) &&
    startPoint.horizontalWord === null
  );
}

export function canStartVertical(startPoint) {
  return (
    !(startPoint.count === 1 && startPoint.horizontalWord !== null) &&
    startPoint.verticalWord === null
  );
}
