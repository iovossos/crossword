export function validateInputs(emptyPuzzle, words) {
  // check if puzzle is a string
  if (typeof emptyPuzzle !== "string" || emptyPuzzle.trim() === "") {
    return { isValid: false };
  }

  // check if words is an array
  if (!Array.isArray(words) || words.length === 0) {
    return { isValid: false };
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
    return { isValid: false };
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
    if (!/^[0-2.]+$/.test(line)) {
      return {
        isValid: false,
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
