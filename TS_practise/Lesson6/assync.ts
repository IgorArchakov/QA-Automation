const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const runTest = async (name: string): Promise<string> => {
  await delay(500);
  return `${name}: passed`;
};

const start = Date.now();
const elapsed = (): string => `[${Date.now() - start}ms]`;

console.log(elapsed(), "1. start");
//delay(3000)
const result = await runTest("login");
console.log(elapsed(), "2.", result);
console.log(elapsed(), "3. end");
