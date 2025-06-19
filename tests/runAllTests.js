// run all unit tests
import "./validation.test.js";
import "./gridUtils.test.js";
import "./wordUtils.test.js";
import "./placement.test.js";
import "./output.test.js";

console.log(
  "🎉 all unit tests completed! run individual test files to see detailed results."
);
console.log("\nto run specific test modules:");
console.log("node tests/validation.test.js");
console.log("node tests/gridUtils.test.js");
console.log("node tests/wordUtils.test.js");
console.log("node tests/placement.test.js");
console.log("node tests/output.test.js");
console.log("\nto run integration tests:");
console.log("node tests/main.test.js");
