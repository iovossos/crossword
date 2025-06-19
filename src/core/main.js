import { validateInputs } from "../validation/validation.js";
import { getDimensions, parseGrid1D } from "../grid/gridUtils.js";
import {
  findStartingPoints1D,
  groupWordsByLength,
  validateWordLengthsMatch,
} from "../words/wordUtils.js";
import { findAllSolutions } from "./solver.js";
import { printGrid } from "../output/output.js";

export default function crosswordSolver(emptyPuzzle, words) {
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

  // pre-group words by length for efficient lookup
  const wordsByLength = groupWordsByLength(words);

  // validate that we have words for all required slot lengths
  if (!validateWordLengthsMatch(startingPoints, words)) {
    console.log("Error");
    return;
  }

  // step counter and solution tracking
  let stepCount = { count: 0 };
  let solutions = [];

  // find solutions (allow up to 2 to detect multiples)
  findAllSolutions(
    grid,
    originalGrid,
    startingPoints,
    wordsByLength,
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
