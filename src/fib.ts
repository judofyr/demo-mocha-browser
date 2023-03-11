export function fib(num: number) {
  if (num <= 1) {
    return num;
  } else {
    return fib(num - 1) + fib(num - 2);
  }
}
