# Demo: Mocha running in both Node.js and browser (headless), with code coverage

## Features

- Tests are written in TypeScript and live next to the code (`.test.ts`)
- Tests running in Node.js: `npm run test-mocha`.
- Tests running in the developer's browser: `npm run build-browser-test` and open `test/browser.html`.
- Tests running in a headless Chrome: `npm run test-browser`.
- Full code coverage report: `npm run coverage` (after running the tests).
  This will print out the coverage report and also generate `coverage/index.html`.
- Test order is randomized (Node.js only).

## Details

- **Mocha** is used as a testing framework.
  The main reason for this is that it's one of the few frameworks which actually supports a browser mode.
- **c8** is used for coverage reporting in Node.js.
- **esbuild** is used to generate a single JavaScript file which includes the Mocha runner and our test.
  See `test/browser.ts` for the entry point.
- **Playwright** provides the headless Chrome browser.
  See `test/run-browser-in-playwright.ts` for how we enable code coverage.
- **Istanbul** is used to combine the code coverage data from c8 and Playwright.
- **ts-node** provides TypeScript support for Mocha.
- **npm-run-all** makes it easy to run everything in parallel.
- **choma** provides random test order for Mocha in Node.js.

## License

[0BSD](https://opensource.org/license/0bsd/).
