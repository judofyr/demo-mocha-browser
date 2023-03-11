import { resolve } from "path";
import { mkdirSync, writeFileSync } from "fs";
import { chromium } from "playwright";
import v8toIstanbul from "v8-to-istanbul";

async function main() {
  let browser = await chromium.launch();
  let context = await browser.newContext();
  let page = await context.newPage();

  let lastConsole = Promise.resolve();

  page.on("console", (msg) => {
    // Make sure that we always execute these in order:
    lastConsole = lastConsole.then(async () => {
      let values: any[] = [];
      for (let arg of msg.args()) {
        values.push(await arg.jsonValue());
      }
      (console as any)[msg.type()].apply(console, values);
    });
  });

  const mochaDidRun = new Promise<number>((resolve) => {
    page.exposeFunction("mochaDidRun", resolve);
  });

  await page.coverage.startJSCoverage();
  await page.goto(`file://${__dirname}/browser.html?reporter=spec`);

  const failures = await mochaDidRun;
  if (failures > 0) process.exit(1);

  let coverage = await page.coverage.stopJSCoverage();
  let srcDir = resolve(__dirname, "../src");
  let coverageDir = resolve(__dirname, "../coverage/browser");

  if (coverage.length !== 1) {
    throw new Error("expected only a single coverage entry");
  }

  for (let entry of coverage) {
    if (!entry.source) continue;

    let converter = v8toIstanbul(
      entry.url,
      0,
      { source: entry.source },
      (path) => path.includes(".test.") || !path.startsWith(srcDir)
    );
    await converter.load();
    converter.applyCoverage(entry.functions);

    mkdirSync(coverageDir, { recursive: true });
    writeFileSync(
      resolve(coverageDir, "coverage-final.json"),
      JSON.stringify(converter.toIstanbul())
    );
  }

  await context.close();
  await browser.close();
}

main();
