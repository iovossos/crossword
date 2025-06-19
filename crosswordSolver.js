export default crosswordSolver;

function crosswordSolver(emptyPuzzle, words) {
  // validate inputs
  const validation = validateInputs(emptyPuzzle, words);
  if (!validation.isValid) {
    console.log("Error");
    if (validation.error) console.log(validation.error);
    return;
  }

  const { rows, cols } = getDimensions(emptyPuzzle);
  const grid = parseGrid1D(emptyPuzzle, cols);
  const originalGrid = [...grid];
  const startingPoints = findStartingPoints1D(grid, rows, cols);

  // step counter and solution tracking
  let stepCount = { count: 0 };
  let solutions = [];

  // find solutions (allow up to 2 to detect multiples)
  findAllSolutions(
    grid,
    originalGrid,
    startingPoints,
    words,
    new Set(),
    rows,
    cols,
    stepCount,
    solutions,
    2 // stop after finding 2 solutions
  );

  if (solutions.length === 0) {
    console.log("Error");
  } else if (solutions.length > 1) {
    console.log("Error");
  } else {
    // exactly one solution found
    printGrid(solutions[0], rows, cols);
  }
}

function validateInputs(emptyPuzzle, words) {
  // check if puzzle is a string
  if (typeof emptyPuzzle !== "string" || emptyPuzzle.trim() === "") {
    return { isValid: false};
  }

  // check if words is an array
  if (!Array.isArray(words) || words.length === 0) {
    return { isValid: false};
  }

  // check if all words are strings with valid characters
  for (let word of words) {
    if (typeof word !== "string" || word.length === 0) {
      return { isValid: false, error: "all words must be non-empty strings" };
    }
    if (!/^[\x20-\x7E]+$/.test(word)) {
      return {
        isValid: false,
        error: "words must contain only letters and numbers",
      };
    }
  }

  // check for duplicate words
  const uniqueWords = new Set(words);
  if (uniqueWords.size !== words.length) {
    return { isValid: false};
  }

  // check puzzle format
  const lines = emptyPuzzle.split("\n");
  if (lines.length === 0) {
    return { isValid: false, error: "puzzle cannot be empty" };
  }

  const cols = lines[0].length;
  if (cols === 0) {
    return { isValid: false, error: "puzzle rows cannot be empty" };
  }

  // check if all rows have same length
  for (let line of lines) {
    if (line.length !== cols) {
      return {
        isValid: false,
        error: "all puzzle rows must have the same length",
      };
    }
  }

  // check if puzzle contains only valid characters (0-9, .)
  for (let line of lines) {
    if (!/^[0-9.]+$/.test(line)) {
      return {
        isValid: false,
        error: "puzzle must contain only digits (0-9) and dots (.)",
      };
    }
  }

  // check if puzzle has at least one starting point
  let hasStartingPoint = false;
  for (let line of lines) {
    for (let char of line) {
      if (!isNaN(char) && parseInt(char) > 0) {
        hasStartingPoint = true;
        break;
      }
    }
    if (hasStartingPoint) break;
  }

  if (!hasStartingPoint) {
    return {
      isValid: false,
      error: "puzzle must have at least one starting point (number > 0)",
    };
  }

  return { isValid: true };
}

function getDimensions(puzzle) {
  const lines = puzzle.split("\n");
  const rows = lines.length;
  const cols = lines[0].length;
  return { rows, cols };
}

function parseGrid1D(puzzle, cols) {
  const lines = puzzle.split("\n");
  const grid = [];

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      grid.push(lines[i][j]);
    }
  }

  return grid;
}

function findStartingPoints1D(grid, rows, cols) {
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

function calculateHorizontalSlotLength(grid, row, col, rows, cols) {
  // check if there's a non-dot character to the left (means we're in middle of a word)
  if (col > 0) {
    const leftIndex = row * cols + (col - 1);
    if (grid[leftIndex] !== "." && grid[leftIndex] !== undefined) {
      return 0; // not a valid horizontal starting position
    }
  }

  let length = 0;
  for (let c = col; c < cols; c++) {
    const index = row * cols + c;
    if (grid[index] === ".") {
      break;
    }
    length++;
  }
  return length;
}

function calculateVerticalSlotLength(grid, row, col, rows, cols) {
  // check if there's a non-dot character above (means we're in middle of a word)
  if (row > 0) {
    const aboveIndex = (row - 1) * cols + col;
    if (grid[aboveIndex] !== "." && grid[aboveIndex] !== undefined) {
      return 0; // not a valid vertical starting position
    }
  }

  let length = 0;
  for (let r = row; r < rows; r++) {
    const index = r * cols + col;
    if (grid[index] === ".") {
      break;
    }
    length++;
  }
  return length;
}

function findAllSolutions(
  grid,
  originalGrid,
  startingPoints,
  words,
  usedWords,
  rows,
  cols,
  stepCount,
  solutions,
  maxSolutions = 10
) {
  stepCount.count++;

  // increased limit for complex puzzles
  if (stepCount.count > 1000000) {
    return;
  }

  // stop if we already have enough solutions
  if (solutions.length >= maxSolutions) {
    return;
  }

  if (usedWords.size === words.length) {
    // found a complete solution
    const newSolution = [...grid];

    // check if this solution is truly unique by comparing grid contents
    let isDuplicate = false;
    for (let existingSolution of solutions) {
      if (areSolutionsEquivalent(newSolution, existingSolution)) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      solutions.push(newSolution);
    }
    return;
  }

  // get starting points that still need words, prioritize by constraint
  let availableStartPoints = startingPoints.filter(
    (sp) =>
      (sp.count === 2 &&
        (sp.horizontalWord === null || sp.verticalWord === null)) ||
      (sp.count === 1 && sp.horizontalWord === null && sp.verticalWord === null)
  );

  if (availableStartPoints.length === 0) {
    return;
  }

  // sort by most constrained (fewest options) first
  availableStartPoints.sort((a, b) => {
    let aOptions = 0;
    let bOptions = 0;

    if (a.count === 2) {
      aOptions = findWordPairsForStartingPoint(a, words, usedWords).length;
    } else {
      aOptions = findWordsForSlot(a, words, usedWords).length;
    }

    if (b.count === 2) {
      bOptions = findWordPairsForStartingPoint(b, words, usedWords).length;
    } else {
      bOptions = findWordsForSlot(b, words, usedWords).length;
    }

    return aOptions - bOptions;
  });

  // try all available starting points
  for (let startPoint of availableStartPoints) {
    if (startPoint.count === 2) {
      // for count=2, we need to find pairs of words with same starting letter
      const wordPairs = findWordPairsForStartingPoint(
        startPoint,
        words,
        usedWords
      );

      for (let { horizontal, vertical } of wordPairs) {
        // save grid state before trying
        const savedGrid = [...grid];
        const placedIndicesH = [];
        const placedIndicesV = [];

        if (
          tryPlaceHorizontal(
            grid,
            horizontal,
            startPoint,
            cols,
            rows,
            words,
            usedWords,
            placedIndicesH
          )
        ) {
          startPoint.horizontalWord = horizontal;
          usedWords.add(horizontal);

          if (
            tryPlaceVertical(
              grid,
              vertical,
              startPoint,
              cols,
              rows,
              words,
              usedWords,
              placedIndicesV
            )
          ) {
            startPoint.verticalWord = vertical;
            usedWords.add(vertical);

            findAllSolutions(
              grid,
              originalGrid,
              startingPoints,
              words,
              usedWords,
              rows,
              cols,
              stepCount,
              solutions,
              maxSolutions
            );

            // backtrack vertical
            startPoint.verticalWord = null;
            usedWords.delete(vertical);
          }

          // backtrack horizontal
          startPoint.horizontalWord = null;
          usedWords.delete(horizontal);
        }

        // restore grid state completely
        for (let i = 0; i < grid.length; i++) {
          grid[i] = savedGrid[i];
        }
      }
    } else if (startPoint.count === 1) {
      // for count=1, find single words that match slot length
      const matchingWords = findWordsForSlot(startPoint, words, usedWords);

      for (let { word, direction } of matchingWords) {
        // save grid state before trying
        const savedGrid = [...grid];
        const placedIndices = [];

        let placed = false;
        if (direction === "horizontal" && canStartHorizontal(startPoint)) {
          if (
            tryPlaceHorizontal(
              grid,
              word,
              startPoint,
              cols,
              rows,
              words,
              usedWords,
              placedIndices
            )
          ) {
            startPoint.horizontalWord = word;
            usedWords.add(word);
            placed = true;
          }
        } else if (direction === "vertical" && canStartVertical(startPoint)) {
          if (
            tryPlaceVertical(
              grid,
              word,
              startPoint,
              cols,
              rows,
              words,
              usedWords,
              placedIndices
            )
          ) {
            startPoint.verticalWord = word;
            usedWords.add(word);
            placed = true;
          }
        }

        if (placed) {
          findAllSolutions(
            grid,
            originalGrid,
            startingPoints,
            words,
            usedWords,
            rows,
            cols,
            stepCount,
            solutions,
            maxSolutions
          );

          // backtrack
          if (direction === "horizontal") {
            startPoint.horizontalWord = null;
          } else {
            startPoint.verticalWord = null;
          }
          usedWords.delete(word);
        }

        // restore grid state completely
        for (let i = 0; i < grid.length; i++) {
          grid[i] = savedGrid[i];
        }
      }
    }

    // if we found solutions, we can break early
    if (solutions.length >= maxSolutions) {
      break;
    }
  }
}

function findWordPairsForStartingPoint(startPoint, words, usedWords) {
  const pairs = [];
  const availableWords = words.filter((w) => !usedWords.has(w));

  // group words by starting letter
  const wordsByStartingLetter = {};
  for (let word of availableWords) {
    const firstLetter = word[0];
    if (!wordsByStartingLetter[firstLetter]) {
      wordsByStartingLetter[firstLetter] = [];
    }
    wordsByStartingLetter[firstLetter].push(word);
  }

  // find pairs with same starting letter that match slot lengths
  for (let letter in wordsByStartingLetter) {
    const wordsWithLetter = wordsByStartingLetter[letter];

    for (let hWord of wordsWithLetter) {
      if (hWord.length === startPoint.horizontalSlotLength) {
        for (let vWord of wordsWithLetter) {
          if (
            vWord !== hWord &&
            vWord.length === startPoint.verticalSlotLength
          ) {
            pairs.push({ horizontal: hWord, vertical: vWord });
          }
        }
      }
    }
  }

  return pairs;
}

function findWordsForSlot(startPoint, words, usedWords) {
  const matches = [];
  const availableWords = words.filter((w) => !usedWords.has(w));

  for (let word of availableWords) {
    if (
      word.length === startPoint.horizontalSlotLength &&
      canStartHorizontal(startPoint)
    ) {
      matches.push({ word, direction: "horizontal" });
    }
    if (
      word.length === startPoint.verticalSlotLength &&
      canStartVertical(startPoint)
    ) {
      matches.push({ word, direction: "vertical" });
    }
  }

  return matches;
}

function tryPlaceHorizontal(
  grid,
  word,
  startPoint,
  cols,
  rows,
  words,
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
        words,
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

function tryPlaceVertical(
  grid,
  word,
  startPoint,
  cols,
  rows,
  words,
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
        words,
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

function getAvailableStartingLetters(words, usedWords) {
  const startingLetters = new Set();
  for (let word of words) {
    if (!usedWords.has(word)) {
      startingLetters.add(word[0]);
    }
  }
  return startingLetters;
}

function undoPlacement(grid, originalGrid, placedIndices) {
  for (let index of placedIndices) {
    grid[index] = originalGrid[index];
  }
}

function canStartHorizontal(startPoint) {
  return (
    !(startPoint.count === 1 && startPoint.verticalWord !== null) &&
    startPoint.horizontalWord === null
  );
}

function canStartVertical(startPoint) {
  return (
    !(startPoint.count === 1 && startPoint.horizontalWord !== null) &&
    startPoint.verticalWord === null
  );
}

function printGrid(grid, rows, cols) {
  let result = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      result += grid[index];
    }
    if (row < rows - 1) result += "\n";
  }
  console.log(result);
}

// improved solution comparison that only checks grid content
function areSolutionsEquivalent(sol1, sol2) {
  if (sol1.length !== sol2.length) return false;

  for (let i = 0; i < sol1.length; i++) {
    // compare the actual grid cells
    if (sol1[i] !== sol2[i]) return false;
  }
  return true;
}
