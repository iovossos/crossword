import {
  getDimensions,
  parseGrid1D,
  calculateHorizontalSlotLength,
  calculateVerticalSlotLength,
} from "../src/grid/gridUtils.js";

function runGridUtilsTests() {
  console.log("=== grid utils tests ===\n");

  // test getDimensions
  console.log("test 1: getDimensions with 4x4 grid");
  const dims1 = getDimensions("2001\n0..0\n1000\n0..0");
  console.log("expected: {rows: 4, cols: 4}, got:", dims1);
  console.log("");

  console.log("test 2: getDimensions with 2x3 grid");
  const dims2 = getDimensions("201\n0.0");
  console.log("expected: {rows: 2, cols: 3}, got:", dims2);
  console.log("");

  // test parseGrid1D
  console.log("test 3: parseGrid1D simple 2x2");
  const grid1 = parseGrid1D("20\n01", 2);
  console.log("expected: ['2','0','0','1'], got:", grid1);
  console.log("");

  console.log("test 4: parseGrid1D with dots");
  const grid2 = parseGrid1D("2.\n.1", 2);
  console.log("expected: ['2','.','.',1'], got:", grid2);
  console.log("");

  // test calculateHorizontalSlotLength
  console.log("test 5: horizontal slot starting at beginning");
  const testGrid = ["2", "0", "0", "1", ".", ".", ".", ".", "1", "0", "0", "0"]; // 3x4 grid: 2001 .... 1000
  const hSlot1 = calculateHorizontalSlotLength(testGrid, 0, 0, 3, 4);
  console.log("expected: 4, got:", hSlot1);
  console.log("");

  console.log("test 6: horizontal slot blocked by dot");
  const hSlot2 = calculateHorizontalSlotLength(testGrid, 1, 0, 3, 4);
  console.log("expected: 0 (row has dots), got:", hSlot2);
  console.log("");

  console.log("test 7: horizontal slot partial length");
  const testGrid2 = ["1", "0", ".", "0"]; // 1x4 grid: 10.0
  const hSlot3 = calculateHorizontalSlotLength(testGrid2, 0, 0, 1, 4);
  console.log("expected: 2 (stops at dot), got:", hSlot3);
  console.log("");

  console.log("test 8: horizontal slot - not at start");
  const testGrid3 = ["0", "1", "0", "0"]; // 1x4 grid: 0100
  const hSlot4 = calculateHorizontalSlotLength(testGrid3, 0, 1, 1, 4);
  console.log("expected: 0 (has char to left), got:", hSlot4);
  console.log("");

  // test calculateVerticalSlotLength
  console.log("test 9: vertical slot starting at top");
  const testGrid4 = ["2", "0", "1", "0"]; // 2x2 grid: 20 10
  const vSlot1 = calculateVerticalSlotLength(testGrid4, 0, 0, 2, 2);
  console.log("expected: 2, got:", vSlot1);
  console.log("");

  console.log("test 10: vertical slot blocked by dot");
  const testGrid5 = ["2", ".", "1", "0"]; // 2x2 grid: 2. 10
  const vSlot2 = calculateVerticalSlotLength(testGrid5, 0, 1, 2, 2);
  console.log("expected: 0 (blocked by dot), got:", vSlot2);
  console.log("");

  console.log("test 11: vertical slot partial length");
  const testGrid6 = ["1", "0", ".", "0"]; // 2x2 grid: 10 .0
  const vSlot3 = calculateVerticalSlotLength(testGrid6, 0, 0, 2, 2);
  console.log("expected: 1 (stops at dot), got:", vSlot3);
  console.log("");

  console.log("test 12: vertical slot - not at start");
  const testGrid7 = ["0", "1", "0", "0"]; // 2x2 grid: 01 00
  const vSlot4 = calculateVerticalSlotLength(testGrid7, 1, 0, 2, 2);
  console.log("expected: 0 (has char above), got:", vSlot4);
  console.log("");

  console.log("=== grid utils tests completed ===\n");
}

runGridUtilsTests();
