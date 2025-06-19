import {
  groupWordsByLength,
  validateWordLengthsMatch,
  findWordPairsForStartingPoint,
  findWordsForSlot,
  getAvailableStartingLetters,
  canStartHorizontal,
  canStartVertical,
} from "../src/words/wordUtils.js";

function runWordUtilsTests() {
  console.log("=== word utils tests ===\n");

  // test groupWordsByLength
  console.log("test 1: groupWordsByLength");
  const words1 = ["cat", "dog", "bird", "fish", "elephant"];
  const grouped1 = groupWordsByLength(words1);
  console.log(
    "expected: {3: ['cat', 'dog'], 4: ['bird', 'fish'], 8: ['elephant']}, got:",
    grouped1
  );
  console.log("");

  console.log("test 2: groupWordsByLength with duplicates");
  const words2 = ["cat", "bat", "rat"];
  const grouped2 = groupWordsByLength(words2);
  console.log("expected: {3: ['cat', 'bat', 'rat']}, got:", grouped2);
  console.log("");

  // test validateWordLengthsMatch
  console.log("test 3: validateWordLengthsMatch - valid");
  const startingPoints1 = [
    { horizontalSlotLength: 3, verticalSlotLength: 4 },
    { horizontalSlotLength: 2, verticalSlotLength: 0 },
  ];
  const words3 = ["cat", "bird", "at"];
  const valid1 = validateWordLengthsMatch(startingPoints1, words3);
  console.log("expected: true, got:", valid1);
  console.log("");

  console.log("test 4: validateWordLengthsMatch - missing length");
  const startingPoints2 = [{ horizontalSlotLength: 5, verticalSlotLength: 3 }];
  const words4 = ["cat", "bird"]; // no 5-letter word
  const valid2 = validateWordLengthsMatch(startingPoints2, words4);
  console.log("expected: false, got:", valid2);
  console.log("");

  // test findWordPairsForStartingPoint
  console.log("test 5: findWordPairsForStartingPoint - same starting letter");
  const startPoint1 = { horizontalSlotLength: 3, verticalSlotLength: 4 };
  const wordsByLength1 = { 3: ["cat", "car"], 4: ["cake", "coal"] };
  const usedWords1 = new Set();
  const pairs1 = findWordPairsForStartingPoint(
    startPoint1,
    wordsByLength1,
    usedWords1
  );
  console.log("expected pairs with same starting letter 'c', got:", pairs1);
  console.log("");

  console.log("test 6: findWordPairsForStartingPoint - no matching letters");
  const startPoint2 = { horizontalSlotLength: 3, verticalSlotLength: 4 };
  const wordsByLength2 = { 3: ["cat", "dog"], 4: ["bird", "fish"] };
  const usedWords2 = new Set();
  const pairs2 = findWordPairsForStartingPoint(
    startPoint2,
    wordsByLength2,
    usedWords2
  );
  console.log("expected: empty array, got:", pairs2);
  console.log("");

  // test findWordsForSlot
  console.log("test 7: findWordsForSlot - horizontal slot");
  const startPoint3 = {
    horizontalSlotLength: 3,
    verticalSlotLength: 4,
    count: 1,
    horizontalWord: null,
    verticalWord: null,
  };
  const wordsByLength3 = { 3: ["cat", "dog"], 4: ["bird"] };
  const usedWords3 = new Set();
  const matches1 = findWordsForSlot(startPoint3, wordsByLength3, usedWords3);
  console.log("expected matches for both directions, got:", matches1);
  console.log("");

  console.log("test 8: findWordsForSlot - with used words");
  const usedWords4 = new Set(["cat"]);
  const matches2 = findWordsForSlot(startPoint3, wordsByLength3, usedWords4);
  console.log("expected: excluding 'cat', got:", matches2);
  console.log("");

  // test getAvailableStartingLetters
  console.log("test 9: getAvailableStartingLetters");
  const wordsByLength4 = { 3: ["cat", "dog"], 4: ["bird", "fish"] };
  const usedWords5 = new Set(["cat"]);
  const letters1 = getAvailableStartingLetters(wordsByLength4, usedWords5);
  console.log(
    "expected: Set with 'd', 'b', 'f' (excluding 'c'), got:",
    Array.from(letters1)
  );
  console.log("");

  // test canStartHorizontal
  console.log("test 10: canStartHorizontal - count 1, no words placed");
  const startPoint4 = { count: 1, horizontalWord: null, verticalWord: null };
  const canH1 = canStartHorizontal(startPoint4);
  console.log("expected: true, got:", canH1);
  console.log("");

  console.log("test 11: canStartHorizontal - count 1, vertical word placed");
  const startPoint5 = { count: 1, horizontalWord: null, verticalWord: "bird" };
  const canH2 = canStartHorizontal(startPoint5);
  console.log("expected: false, got:", canH2);
  console.log("");

  console.log("test 12: canStartHorizontal - count 2");
  const startPoint6 = { count: 2, horizontalWord: null, verticalWord: "bird" };
  const canH3 = canStartHorizontal(startPoint6);
  console.log("expected: true, got:", canH3);
  console.log("");

  // test canStartVertical
  console.log("test 13: canStartVertical - count 1, no words placed");
  const startPoint7 = { count: 1, horizontalWord: null, verticalWord: null };
  const canV1 = canStartVertical(startPoint7);
  console.log("expected: true, got:", canV1);
  console.log("");

  console.log("test 14: canStartVertical - count 1, horizontal word placed");
  const startPoint8 = { count: 1, horizontalWord: "cat", verticalWord: null };
  const canV2 = canStartVertical(startPoint8);
  console.log("expected: false, got:", canV2);
  console.log("");

  console.log("test 15: canStartVertical - count 2");
  const startPoint9 = { count: 2, horizontalWord: "cat", verticalWord: null };
  const canV3 = canStartVertical(startPoint9);
  console.log("expected: true, got:", canV3);
  console.log("");

  console.log("=== word utils tests completed ===\n");
}

runWordUtilsTests();
