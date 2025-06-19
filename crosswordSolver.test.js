import crosswordSolver from "./crosswordSolver.js";

function runTests() {
  console.log("=== running crossword solver tests ===\n");

  console.log("Audit1");
  const puzzle1 = "2001\n0..0\n1000\n0..0";
  const words1 = ["casa", "alan", "ciao", "anta"];
  crosswordSolver(puzzle1, words1);
  console.log("");

  console.log("Audit 2");
  const puzzle2 = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`;
  const words2 = [
    "sun",
    "sunglasses",
    "suncream",
    "swimming",
    "bikini",
    "beach",
    "icecream",
    "tan",
    "deckchair",
    "sand",
    "seaside",
    "sandals",
  ];
  crosswordSolver(puzzle2, words2);
  console.log("");

  console.log("audit 3");
  const puzzle3 = `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`;
  const words3 = [
    "popcorn",
    "fruit",
    "flour",
    "chicken",
    "eggs",
    "vegetables",
    "pasta",
    "pork",
    "steak",
    "cheese",
  ];
  crosswordSolver(puzzle3, words3);
  console.log("");

  console.log("audit 4");
  const puzzle4 = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`;
  const words4 = [
    "sun",
    "sunglasses",
    "suncream",
    "swimming",
    "bikini",
    "beach",
    "icecream",
    "tan",
    "deckchair",
    "sand",
    "seaside",
    "sandals",
  ].reverse();
  crosswordSolver(puzzle4, words4);
  console.log("");

  console.log("audit 5");
  const puzzle5 = "2001\n0..0\n2000\n0..0";
  const words5 = ["casa", "alan", "ciao", "anta"];
  crosswordSolver(puzzle5, words5);
  console.log("");

  console.log("audit 6");
  const puzzle6 = "0001\n0..0\n3000\n0..0";
  const words6 = ["casa", "alan", "ciao", "anta"];
  crosswordSolver(puzzle6, words6);
  console.log("");

  console.log("audit 7");
  const puzzle7 = "2001\n0..0\n1000\n0..0";
  const words7 = ["casa", "casa", "ciao", "anta"];
  crosswordSolver(puzzle7, words7);
  console.log("");

  console.log("audit 8");
  const puzzle8 = "";
  const words8 = ["casa", "alan", "ciao", "anta"];
  crosswordSolver(puzzle8, words8);
  console.log("");

  console.log("audit 9");
  const puzzle9 = 123;
  const words9 = ["casa", "alan", "ciao", "anta"];
  crosswordSolver(puzzle9, words9);
  console.log("");

  console.log("audit 10");
  const puzzle10 = "2001\n0..0\n1000\n0..0";
  const words10 = 123;
  crosswordSolver(puzzle10, words10);
  console.log("");

  console.log("audit 11");
  const puzzle11 = "2000\n0...\n0...\n0...";
  const words11 = ["abba", "assa"];
  crosswordSolver(puzzle11, words11);
  console.log("");

  console.log("audit 12");
  const puzzle12 = "2001\n0..0\n1000\n0..0";
  const words12 = ["aaab", "aaac", "aaad", "aaae"];
  crosswordSolver(puzzle12, words12);
  console.log("");

  console.log("=== tests completed ===");
}

runTests();
