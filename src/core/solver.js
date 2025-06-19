import {
  findWordPairsForStartingPoint,
  findWordsForSlot,
  canStartHorizontal,
  canStartVertical,
} from "../words/wordUtils.js";
import { tryPlaceHorizontal, tryPlaceVertical } from "../grid/placement.js";

export function findAllSolutions(
  grid,
  originalGrid,
  startingPoints,
  wordsByLength,
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

  if (usedWords.size === Object.values(wordsByLength).flat().length) {
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

  // early constraint check - ensure we have enough words left
  const remainingSlots = availableStartPoints.reduce((count, sp) => {
    let slots = 0;
    if (sp.count === 2) {
      if (sp.horizontalWord === null && sp.horizontalSlotLength > 1) slots++;
      if (sp.verticalWord === null && sp.verticalSlotLength > 1) slots++;
    } else if (sp.count === 1) {
      if (sp.horizontalSlotLength > 1 || sp.verticalSlotLength > 1) slots++;
    }
    return count + slots;
  }, 0);

  const remainingWords =
    Object.values(wordsByLength).flat().length - usedWords.size;
  if (remainingWords < remainingSlots) {
    return; // not enough words left
  }

  // sort by most constrained (fewest options) first
  availableStartPoints.sort((a, b) => {
    let aOptions = 0;
    let bOptions = 0;

    if (a.count === 2) {
      aOptions = findWordPairsForStartingPoint(
        a,
        wordsByLength,
        usedWords
      ).length;
    } else {
      aOptions = findWordsForSlot(a, wordsByLength, usedWords).length;
    }

    if (b.count === 2) {
      bOptions = findWordPairsForStartingPoint(
        b,
        wordsByLength,
        usedWords
      ).length;
    } else {
      bOptions = findWordsForSlot(b, wordsByLength, usedWords).length;
    }

    return aOptions - bOptions;
  });

  // handle forced placements first (starting points with only one option)
  for (let startPoint of availableStartPoints) {
    let options = 0;
    if (startPoint.count === 2) {
      options = findWordPairsForStartingPoint(
        startPoint,
        wordsByLength,
        usedWords
      ).length;
    } else {
      options = findWordsForSlot(startPoint, wordsByLength, usedWords).length;
    }

    if (options === 0) {
      return; // no valid options, backtrack
    }

    if (options === 1) {
      // force this placement and continue
      if (startPoint.count === 2) {
        const wordPairs = findWordPairsForStartingPoint(
          startPoint,
          wordsByLength,
          usedWords
        );
        const { horizontal, vertical } = wordPairs[0];

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
            wordsByLength,
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
              wordsByLength,
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
              wordsByLength,
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
      } else {
        const matchingWords = findWordsForSlot(
          startPoint,
          wordsByLength,
          usedWords
        );
        const { word, direction } = matchingWords[0];

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
              wordsByLength,
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
              wordsByLength,
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
            wordsByLength,
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
      return; // processed forced placement
    }
  }

  // try all available starting points (for non-forced placements)
  for (let startPoint of availableStartPoints) {
    if (startPoint.count === 2) {
      // for count=2, we need to find pairs of words with same starting letter
      const wordPairs = findWordPairsForStartingPoint(
        startPoint,
        wordsByLength,
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
            wordsByLength,
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
              wordsByLength,
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
              wordsByLength,
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
      const matchingWords = findWordsForSlot(
        startPoint,
        wordsByLength,
        usedWords
      );

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
              wordsByLength,
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
              wordsByLength,
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
            wordsByLength,
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

// improved solution comparison that only checks grid content
export function areSolutionsEquivalent(sol1, sol2) {
  if (sol1.length !== sol2.length) return false;

  for (let i = 0; i < sol1.length; i++) {
    // compare the actual grid cells
    if (sol1[i] !== sol2[i]) return false;
  }
  return true;
}
