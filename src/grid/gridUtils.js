export function getDimensions(puzzle) {
  const lines = puzzle.split("\n");
  const rows = lines.length;
  const cols = lines[0].length;
  return { rows, cols };
}

export function parseGrid1D(puzzle, cols) {
  const lines = puzzle.split("\n");
  const grid = [];

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      grid.push(lines[i][j]);
    }
  }

  return grid;
}

export function calculateHorizontalSlotLength(grid, row, col, rows, cols) {
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

export function calculateVerticalSlotLength(grid, row, col, rows, cols) {
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
