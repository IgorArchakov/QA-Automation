function greeting(name: string) {
  console.log(`Hello, ${name}!`);
}

greeting('Ihor');

function formatTestResult(name: string, passed: boolean): string {
  return `${passed ? '✅' : '❌'} ${name}`;
}

console.log(formatTestResult('Login', true));
console.log(formatTestResult('Login', false));

let testArray = [1, 2, 3, 4];
let anyArray: (number | string | boolean)[] = [1, 'two', true, 5];

let testCases: string[] = [
  'login',
  'logout',
  'loginFalse',
  'Profile',
  'Settings',
];

function getLoginCases(testCases: string[]): string[] {
  return testCases.filter((testCase) =>
    testCase.toLowerCase().includes('login'),
  );
}

console.log(getLoginCases(testCases));

enum TestStatus {
  Passed,
  Failed,
  Skipped,
}

function getStatusEmoji(status: TestStatus): string {
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
}
console.log(getStatusEmoji(TestStatus.Passed));
console.log(getStatusEmoji(TestStatus.Failed));
console.log(getStatusEmoji(TestStatus.Skipped));

const loginTestCases: string[] = [
  'Login with valid creds',
  'LOGIN timeout',
  'Logout flow',
  'Profile update',
  'login button disabled',
];

function findCases(loginTestCases: string[], keyword: string): string[] {
  return loginTestCases.filter((myTest) =>
    myTest.toLowerCase().includes(keyword.toLowerCase()),
  );
}

console.log(findCases(loginTestCases, 'TIMEOUT'));

enum myTestsStatus {
  Passed = 'passed',
  Failed = 'failed',
  Skipped = 'skipped',
}

function formatStatusLine(name: string, status: myTestsStatus): string {
  switch (status) {
    case myTestsStatus.Passed:
      return `${name} - ${status.toUpperCase()} ✅`;
    case myTestsStatus.Failed:
      return `${name} - ${status.toUpperCase()} ❌`;
    case myTestsStatus.Skipped:
      return `${name} - ${status.toUpperCase()} ⏭️`;
    default:
      return '';
  }
}

console.log(formatStatusLine('Login', myTestsStatus.Passed));
console.log(formatStatusLine('Login', myTestsStatus.Failed));
console.log(formatStatusLine('Login', myTestsStatus.Skipped));

const results = [
  { name: 'Login test', status: TestStatus.Passed },
  { name: 'Logout test', status: TestStatus.Failed },
  { name: 'Profile test', status: TestStatus.Passed },
  { name: 'Settings test', status: TestStatus.Skipped },
  { name: 'Checkout test', status: TestStatus.Failed },
];

function countByStatus(
  results: { name: string; status: TestStatus }[],
  status: TestStatus,
): number {
  return results.filter((result) => result.status === status).length;
}

console.log(countByStatus(results, TestStatus.Failed));
console.log(countByStatus(results, TestStatus.Passed));
console.log(countByStatus(results, TestStatus.Skipped));

function printSummary(results: { name: string; status: TestStatus }[]): void {
  const passed = countByStatus(results, TestStatus.Passed);
  const failed = countByStatus(results, TestStatus.Failed);
  const skipped = countByStatus(results, TestStatus.Skipped);
  const passRate = Math.round((passed / results.length) * 100);

  console.log(
    `✅ Passed: ${passed}, \n❌ Failed: ${failed}, \n⏭️ Skipped: ${skipped}, \nPass rate: ${passRate} %`,
  );
}

printSummary(results);
