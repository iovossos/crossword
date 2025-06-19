import { printGrid } from "../src/output/output.js";

function runOutputTests() {
  console.log("=== output tests ===\n");

  // capture console.log output for testing
  let capturedOutput = "";
  const originalLog = console.log;
  console.log = (message) => {
    capturedOutput = message;
  };

  console.log = originalLog; // restore normal logging for test descriptions

  console.log("test 1: printGrid 2x2");
  console.log = (message) => {
    capturedOutput = message;
  };
  const grid1 = ["c", "a", "t", "s"];
  printGrid(grid1, 2, 2);
  console.log = originalLog;
  console.log("expected: 'ca\\nts', got:", JSON.stringify(capturedOutput));
  console.log("");

  console.log("test 2: printGrid 1x4");
  console.log = (message) => {
    capturedOutput = message;
  };
  const grid2 = ["t", "e", "s", "t"];
  printGrid(grid2, 1, 4);
  console.log = originalLog;
  console.log("expected: 'test', got:", JSON.stringify(capturedOutput));
  console.log("");

  console.log("test 3: printGrid 4x1");
  console.log = (message) => {
    capturedOutput = message;
  };
  const grid3 = ["t", "e", "s", "t"];
  printGrid(grid3, 4, 1);
  console.log = originalLog;
  console.log(
    "expected: 't\\ne\\ns\\nt', got:",
    JSON.stringify(capturedOutput)
  );
  console.log("");

  console.log("test 4: printGrid 3x3 with dots");
  console.log = (message) => {
    capturedOutput = message;
  };
  const grid4 = ["c", "a", "t", ".", "o", ".", "g", "o", "d"];
  printGrid(grid4, 3, 3);
  console.log = originalLog;
  console.log(
    "expected: 'cat\\n.o.\\ngod', got:",
    JSON.stringify(capturedOutput)
  );
  console.log("");

  console.log("=== output tests completed ===\n");
}

runOutputTests();
