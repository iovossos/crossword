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
- Optimized word matching by length for better performance
- Pre-filtering to avoid checking incompatible word/slot combinations

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
import crosswordSolver from './src/core/main.js';

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

Run the full audit test suite:

```bash
node tests/main.test.js
```

Run all unit tests:

```bash
node tests/runAllTests.js
```

Run specific unit test modules:

```bash
node tests/validation.test.js    # test input validation
node tests/gridUtils.test.js     # test grid parsing functions
node tests/wordUtils.test.js     # test word processing functions
node tests/placement.test.js     # test word placement logic
node tests/output.test.js        # test output formatting
```

## Algorithm

The solver uses a depth-first search with backtracking:

1. **Validation**: Checks input format and consistency
2. **Parsing**: Converts the puzzle string into a working grid
3. **Word Preprocessing**: Groups words by length for efficient lookup
4. **Length Validation**: Ensures words exist for all required slot lengths
5. **Starting Points**: Identifies all numbered cells and their slot lengths
6. **Word Placement**: 
   - For cells marked `2`: Finds pairs of words with the same starting letter
   - For cells marked `1`: Finds single words that fit the slot
7. **Constraint Propagation**: Prioritizes forced placements and most constrained positions
8. **Backtracking**: If a placement doesn't lead to a solution, it backtracks and tries alternatives
9. **Solution Verification**: Ensures exactly one unique solution exists

## File Structure

```
crossword/
├── src/
│   ├── core/
│   │   ├── main.js          # main entry point and orchestration
│   │   └── solver.js        # backtracking algorithm and solution finding
│   ├── validation/
│   │   └── validation.js    # input validation and format checking
│   ├── grid/
│   │   ├── gridUtils.js     # grid parsing and slot length calculations
│   │   └── placement.js     # word placement and conflict detection
│   ├── words/
│   │   └── wordUtils.js     # word processing, grouping, and matching
│   └── output/
│       └── output.js        # result formatting and display
├── tests/
│   ├── main.test.js         # audit test cases
│   ├── validation.test.js   # unit tests for input validation
│   ├── gridUtils.test.js    # unit tests for grid parsing and calculations
│   ├── wordUtils.test.js    # unit tests for word processing functions
│   ├── placement.test.js    # unit tests for word placement logic
│   ├── output.test.js       # unit tests for output formatting
│   └── runAllTests.js       # test runner for all unit tests
└── README.md                # this file
```

### Module Descriptions

**src/core/** - main logic and solving engine
- `main.js` - coordinates the entire solving process
- `solver.js` - implements the recursive backtracking algorithm

**src/validation/** - input validation
- `validation.js` - validates puzzle format, word list, and constraints

**src/grid/** - grid operations and word placement
- `gridUtils.js` - parses puzzle strings and calculates slot dimensions
- `placement.js` - handles placing words on grid with conflict checking

**src/words/** - word processing and matching
- `wordUtils.js` - groups words by length, finds matches, validates compatibility

**src/output/** - result formatting
- `output.js` - formats and displays the solved puzzle

**tests/** - test suite
- `main.test.js` - contains all audit tests and edge cases
- `validation.test.js` - unit tests for input validation functions
- `gridUtils.test.js` - unit tests for grid parsing and slot calculations
- `wordUtils.test.js` - unit tests for word processing and matching
- `placement.test.js` - unit tests for word placement and conflict detection
- `output.test.js` - unit tests for output formatting functions
- `runAllTests.js` - convenient runner for all unit tests

## Performance Optimizations

- **Pre-filtering by length**: only considers words that match slot lengths
- **Early validation**: checks if required word lengths exist before solving
- **Constraint propagation**: handles forced placements first
- **Optimized word lookup**: groups words by length for O(1) access
- **Smart backtracking**: most constrained positions are tried first

## Future Improvements

### Performance Enhancements
- **Arc consistency**: Implement forward checking to eliminate impossible word combinations earlier
- **Parallel processing**: Use web workers to explore different branches simultaneously
- **Memoization**: Cache partial solutions to avoid recalculating similar states
- **Better heuristics**: Implement minimum remaining values (MRV) and degree heuristics for variable ordering

### Code Quality
- **Error handling**: More granular error messages with specific failure reasons
- **Logging system**: Configurable logging levels for debugging complex puzzles
- **Performance metrics**: Built-in timing and step counting for optimization analysis
- **Configuration options**: Customizable solver parameters (max steps, timeout, etc.)

### Features
- **Interactive mode**: Step-by-step solution visualization
- **Puzzle generation**: Create crossword puzzles given just a word list
- **Format support**: Support for standard crossword puzzle formats (.puz, .ipuz)
- **Difficulty analysis**: Automatic puzzle difficulty rating based on solving complexity