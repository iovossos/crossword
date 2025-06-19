import { validateInputs } from "../src/validation/validation.js";

function runValidationTests() {
  console.log("=== validation tests ===\n");

  // test valid inputs
  console.log("test 1: valid puzzle and words");
  const result1 = validateInputs("2001\n0..0\n1000\n0..0", [
    "casa",
    "alan",
    "ciao",
    "anta",
  ]);
  console.log("expected: true, got:", result1.isValid);
  console.log("");

  // test empty puzzle
  console.log("test 2: empty puzzle string");
  const result2 = validateInputs("", ["casa", "alan"]);
  console.log("expected: false, got:", result2.isValid);
  console.log("");

  // test non-string puzzle
  console.log("test 3: non-string puzzle");
  const result3 = validateInputs(123, ["casa", "alan"]);
  console.log("expected: false, got:", result3.isValid);
  console.log("");

  // test empty words array
  console.log("test 4: empty words array");
  const result4 = validateInputs("2001\n0..0", []);
  console.log("expected: false, got:", result4.isValid);
  console.log("");

  // test non-array words
  console.log("test 5: non-array words");
  const result5 = validateInputs("2001\n0..0", "not an array");
  console.log("expected: false, got:", result5.isValid);
  console.log("");

  // test duplicate words
  console.log("test 6: duplicate words");
  const result6 = validateInputs("2001\n0..0", ["casa", "casa", "alan"]);
  console.log("expected: false, got:", result6.isValid);
  console.log("");

  // test empty word in array
  console.log("test 7: empty word in array");
  const result7 = validateInputs("2001\n0..0", ["casa", "", "alan"]);
  console.log("expected: false, got:", result7.isValid);
  console.log("");

  // test non-string word
  console.log("test 8: non-string word");
  const result8 = validateInputs("2001\n0..0", ["casa", 123, "alan"]);
  console.log("expected: false, got:", result8.isValid);
  console.log("");

  // test inconsistent row lengths
  console.log("test 9: inconsistent row lengths");
  const result9 = validateInputs("2001\n0..\n1000", ["casa", "alan"]);
  console.log("expected: false, got:", result9.isValid);
  console.log("");

  // test invalid characters in puzzle
  console.log("test 10: invalid characters in puzzle");
  const result10 = validateInputs("2001\n0#*0\n1000", ["casa", "alan"]);
  console.log("expected: false, got:", result10.isValid);
  console.log("");

  // test no starting points
  console.log("test 11: no starting points (all 0s and dots)");
  const result11 = validateInputs("000.\n0..0\n0000", ["casa", "alan"]);
  console.log("expected: false, got:", result11.isValid);
  console.log("");

  console.log("=== validation tests completed ===\n");
}

runValidationTests();
