export function calculatePassRate(passed: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return (passed / total) * 100;
}

console.log(calculatePassRate(5, 0));

function runTest(name: string, timeout: number = 5000): void {
  console.log(`Running ${name} test (timeout: ${timeout}ms)`);
}

runTest('Login');
runTest('Logout', 40);
runTest('Profile', 10000);

enum TestStatus {
  Passed,
  Failed,
  Skipped,
}

const getStatusEmojiArrow = (status: TestStatus): string => {
  switch (status) {
    case TestStatus.Passed:
      return '✅';
    case TestStatus.Failed:
      return '❌';
    case TestStatus.Skipped:
      return '⏭️';
    default:
      return '';
  }
};
console.log(getStatusEmojiArrow(TestStatus.Passed));
console.log(getStatusEmojiArrow(TestStatus.Failed));
console.log(getStatusEmojiArrow(TestStatus.Skipped));
