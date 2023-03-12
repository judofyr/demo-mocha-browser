import mocha from "mocha/mocha.js";
import "mocha/mocha.css";

declare global {
  interface Window {
    mochaDidRun?: (failures: number) => void;
  }
}

async function test() {
  // Allow the reporter to be defined through the query parameter:
  let reporter = "html";
  let m = location.search.match(/(\?|&)reporter=(\w+)/);
  if (m) {
    reporter = m[2]!;
  }
  mocha.setup({
    ui: "bdd",
    reporter,
  });

  // Here we explicitly choose which tests to run in the browser:
  await import("../src/fib.test.js");

  mocha.run(window.mochaDidRun);
}

test();
