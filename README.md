# Crossword Solver

A JavaScript implementation of a crossword puzzle solver that takes an empty crossword grid and a list of words, then finds the unique solution to fill the grid.

## Authors

- **smanousi**
- **iovossos**

## Description

This crossword solver uses a backtracking algorithm to place words in a crossword puzzle grid. It validates inputs, checks for unique solutions, and handles various edge cases including multiple solutions, no solutions, and invalid inputs. The test file contains all the audit tests.
This project is part of the zone01 curriculum

## Features

- Validates puzzle format and word list
- Detects puzzles with no solution
- Detects puzzles with multiple solutions
- Handles crossword grids with starting positions marked by numbers (1 or 2)
- Ensures all words fit properly with valid intersections
- Provides detailed error messages for various failure cases

## Installation

1. Clone the repository:
```bash
git clone https://platform.zone01.gr/git/smanousi/crossword
cd crossword
```

2. No dependencies required - pure JavaScript implementation

## Usage

### Basic Usage

```javascript
const crosswordSolver = require('./crosswordSolver.js');

// Define your puzzle grid
const puzzle = "2001\n0..0\n1000\n0..0";

// Define your word list
const words = ["casa", "alan", "ciao", "anta"];

// Solve the puzzle
crosswordSolver(puzzle, words);
```

### Puzzle Format

- Use dots (`.`) to represent blocked cells
- Use zeros (`0`) to represent empty cells to be filled
- Use numbers (`1` or `2`) to represent starting positions:
  - `1`: Starting position for one word (either horizontal or vertical)
  - `2`: Starting position for two words (both horizontal and vertical)

### Example Puzzle

```
2001
0..0
1000
0..0
```

This represents a 4x4 grid where:
- Position (0,0) starts 2 words
- Position (0,3) starts 1 word  
- Position (2,0) starts 1 word
- Dots represent blocked cells

## Running Tests

Run the test suite:

```bash
node crosswordSolver.test.js
```

## Algorithm

The solver uses a depth-first search with backtracking:

1. **Validation**: Checks input format and consistency
2. **Parsing**: Converts the puzzle string into a working grid
3. **Starting Points**: Identifies all numbered cells and their slot lengths
4. **Word Placement**: 
   - For cells marked `2`: Finds pairs of words with the same starting letter
   - For cells marked `1`: Finds single words that fit the slot
5. **Backtracking**: If a placement doesn't lead to a solution, it backtracks and tries alternatives
6. **Solution Verification**: Ensures exactly one unique solution exists

## File Structure

```
crossword/
├── crosswordSolver.js      # Main solver implementation
├── crosswordSolver.test.js # Test suite
└── README.md              # This file
```