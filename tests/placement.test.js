import {
  tryPlaceHorizontal,
  tryPlaceVertical,
  undoPlacement,
} from "../src/grid/placement.js";

function runPlacementTests() {
  console.log("=== placement tests ===\n");

  // test tryPlaceHorizontal
  console.log("test 1: tryPlaceHorizontal - simple placement");
  const grid1 = ["2", "0", "0", "0"];
  const startPoint1 = { row: 0, col: 0 };
  const wordsByLength1 = { 4: ["test"] };
  const usedWords1 = new Set();
  const placedIndices1 = [];
  const result1 = tryPlaceHorizontal(
    grid1,
    "test",
    startPoint1,
    4,
    1,
    wordsByLength1,
    usedWords1,
    placedIndices1
  );
  console.log("expected: true, got:", result1);
  console.log("grid after placement:", grid1);
  console.log("placed indices:", placedIndices1);
  console.log("");

  console.log("test 2: tryPlaceHorizontal - word too long");
  const grid2 = ["2", "0", "0"];
  const startPoint2 = { row: 0, col: 0 };
  const wordsByLength2 = { 4: ["test"] };
  const usedWords2 = new Set();
  const placedIndices2 = [];
  const result2 = tryPlaceHorizontal(
    grid2,
    "test",
    startPoint2,
    3,
    1,
    wordsByLength2,
    usedWords2,
    placedIndices2
  );
  console.log("expected: false (word too long), got:", result2);
  console.log("grid unchanged:", grid2);
  console.log("");

  console.log("test 3: tryPlaceHorizontal - hits dot");
  const grid3 = ["2", "0", ".", "0"];
  const startPoint3 = { row: 0, col: 0 };
  const wordsByLength3 = { 4: ["test"] };
  const usedWords3 = new Set();
  const placedIndices3 = [];
  const result3 = tryPlaceHorizontal(
    grid3,
    "test",
    startPoint3,
    4,
    1,
    wordsByLength3,
    usedWords3,
    placedIndices3
  );
  console.log("expected: false (hits dot), got:", result3);
  console.log("grid unchanged:", grid3);
  console.log("");

  console.log("test 4: tryPlaceHorizontal - conflicting letter");
  const grid4 = ["2", "x", "0", "0"];
  const startPoint4 = { row: 0, col: 0 };
  const wordsByLength4 = { 4: ["test"] };
  const usedWords4 = new Set();
  const placedIndices4 = [];
  const result4 = tryPlaceHorizontal(
    grid4,
    "test",
    startPoint4,
    4,
    1,
    wordsByLength4,
    usedWords4,
    placedIndices4
  );
  console.log("expected: false (letter conflict), got:", result4);
  console.log("grid unchanged:", grid4);
  console.log("");

  console.log("test 5: tryPlaceHorizontal - matching existing letter");
  const grid5 = ["2", "e", "0", "0"];
  const startPoint5 = { row: 0, col: 0 };
  const wordsByLength5 = { 4: ["test"] };
  const usedWords5 = new Set();
  const placedIndices5 = [];
  const result5 = tryPlaceHorizontal(
    grid5,
    "test",
    startPoint5,
    4,
    1,
    wordsByLength5,
    usedWords5,
    placedIndices5
  );
  console.log("expected: true (matching letter), got:", result5);
  console.log("grid after placement:", grid5);
  console.log("placed indices (should skip index 1):", placedIndices5);
  console.log("");

  // test tryPlaceVertical
  console.log("test 6: tryPlaceVertical - simple placement");
  const grid6 = ["2", "0", "0", "0"]; // 2x2 grid: 20 00
  const startPoint6 = { row: 0, col: 0 };
  const wordsByLength6 = { 2: ["to"] };
  const usedWords6 = new Set();
  const placedIndices6 = [];
  const result6 = tryPlaceVertical(
    grid6,
    "to",
    startPoint6,
    2,
    2,
    wordsByLength6,
    usedWords6,
    placedIndices6
  );
  console.log("expected: true, got:", result6);
  console.log("grid after placement:", grid6);
  console.log("placed indices:", placedIndices6);
  console.log("");

  console.log("test 7: tryPlaceVertical - word too long");
  const grid7 = ["2", "0"]; // 1x2 grid
  const startPoint7 = { row: 0, col: 0 };
  const wordsByLength7 = { 2: ["to"] };
  const usedWords7 = new Set();
  const placedIndices7 = [];
  const result7 = tryPlaceVertical(
    grid7,
    "to",
    startPoint7,
    2,
    1,
    wordsByLength7,
    usedWords7,
    placedIndices7
  );
  console.log("expected: false (word too long vertically), got:", result7);
  console.log("grid unchanged:", grid7);
  console.log("");

  console.log("test 8: tryPlaceVertical - hits dot");
  const grid8 = ["2", "0", ".", "0"]; // 2x2 grid: 20 .0
  const startPoint8 = { row: 0, col: 0 };
  const wordsByLength8 = { 2: ["to"] };
  const usedWords8 = new Set();
  const placedIndices8 = [];
  const result8 = tryPlaceVertical(
    grid8,
    "to",
    startPoint8,
    2,
    2,
    wordsByLength8,
    usedWords8,
    placedIndices8
  );
  console.log("expected: false (hits dot), got:", result8);
  console.log("grid unchanged:", grid8);
  console.log("");

  // test undoPlacement
  console.log("test 9: undoPlacement");
  const grid9 = ["t", "e", "s", "t"];
  const originalGrid9 = ["2", "0", "0", "0"];
  const placedIndices9 = [0, 1, 2, 3];
  undoPlacement(grid9, originalGrid9, placedIndices9);
  console.log("expected: grid restored to original, got:", grid9);
  console.log("");

  console.log("test 10: undoPlacement - partial restoration");
  const grid10 = ["t", "e", "s", "t"];
  const originalGrid10 = ["2", "e", "0", "0"];
  const placedIndices10 = [0, 2, 3]; // index 1 wasn't changed
  undoPlacement(grid10, originalGrid10, placedIndices10);
  console.log(
    "expected: partial restoration (keeping 'e' at index 1), got:",
    grid10
  );
  console.log("");

  console.log("=== placement tests completed ===\n");
}

runPlacementTests();
