import { expect } from "chai";

import { fib } from "./fib";

describe("fib", () => {
  it("works for n=0", () => {
    expect(fib(0)).to.be.eq(0);
  });

  it("works for n=1", () => {
    expect(fib(1)).to.be.eq(1);
  });

  it("works for n=2", () => {
    expect(fib(2)).to.be.eq(1);
  });

  it("works for n=3", () => {
    expect(fib(3)).to.be.eq(2);
  });

  it("works for n=4", () => {
    expect(fib(4)).to.be.eq(3);
  });

  it("works for n=5", () => {
    expect(fib(5)).to.be.eq(5);
  });
});
