// task 1

import { calculatePassRate } from '../Lesson3/lesson3.js';

//enum TestStatus {
//   Passed = 'passed',
//   Failed = 'failed',
//    Skipped = 'skipped'
//}

type TestStatus = 'passed' | 'failed' | 'skipped';

export interface TestResult {
  readonly id: number;
  title: string;
  status: TestStatus;
  durationMs: number;
  bugId?: string;
}

interface TestSuite {
  suiteName: string;
  cases: TestResult[];
}

export const testRun: TestResult[] = [
  {
    id: 1,
    title: 'Test Case 1',
    status: 'passed',
    durationMs: 1000,
  },
  {
    id: 2,
    title: 'Test Case 2',
    status: 'failed',
    durationMs: 2000,
    bugId: 'CAR-1234',
  },
  {
    id: 3,
    title: 'Test Case 3',
    status: 'passed',
    durationMs: 500,
  },
  {
    id: 4,
    title: 'Test Case 4',
    status: 'skipped',
    durationMs: 0,
  },
  {
    id: 5,
    title: 'Test Case 5',
    status: 'failed',
    durationMs: 1500,
    bugId: 'CAR-5678',
  },
  {
    id: 6,
    title: 'Test Case 6',
    status: 'passed',
    durationMs: 1000,
  },
];

const testRunSecondary: TestResult[] = [
  {
    id: 1,
    title: 'Test Case 1',
    status: 'passed',
    durationMs: 1000,
  },
  {
    id: 2,
    title: 'Test Case 2',
    status: 'failed',
    durationMs: 2000,
    bugId: 'CAR-1234',
  },
  {
    id: 3,
    title: 'Test Case 3',
    status: 'passed',
    durationMs: 500,
  },
];

//task 2 - choose and summarize the test results
function getFailedWithBugs(run: TestResult[]): TestResult[] {
  return run.filter((test) => test.status === 'failed' && test.bugId);
}

console.log(getFailedWithBugs(testRun));
//task 3 - преобразование
// превратить массив объектов в массив строк вида:
// "#1 Login test — passed (230ms)"
// "#2 Checkout — failed (1200ms) → CAR-1234"
const formatRun = (run: TestResult[]): string[] => {
  return run.map((test) => {
    //        const textBugInfo = '#' + test.id + ' ' + test.title + ' - ' + test.status + ' (' + test.durationMs + 'ms)'
    const textBugInfo = `#${test.id} ${test.title} - ${test.status} (${test.durationMs}ms)${test.bugId ? `→ ${test.bugId}` : ''}`;
    return textBugInfo;
  });
};

console.log(formatRun(testRun));

const getTotalDuration = (run: TestResult[]): number => {
  return run.reduce((sum, test) => sum + test.durationMs, 0);
};

function getTotalDurationS(run: TestResult[]): number {
  let total = 0;
  for (const test of run) {
    total += test.durationMs;
  }
  return total;
}

console.log(getTotalDuration(testRun));
console.log(getTotalDurationS(testRun));

function printSuiteSummary(suite: TestSuite): void {
  const testsTotal = suite.cases.length;
  const testPassed = suite.cases.filter(
    (test) => test.status === 'passed',
  ).length;
  const passRate = calculatePassRate(testPassed, testsTotal);
  console.log(`Test suite: ${suite.suiteName}`);
  console.log(`Total tests: ${testsTotal}`);
  console.log(`Pass rate: ${passRate}%`);
}

printSuiteSummary({ suiteName: 'My Test Suite', cases: testRun });
printSuiteSummary({
  suiteName: 'My Second Test Suite',
  cases: testRunSecondary,
});

function getFailedTests(suite: TestResult[]): string[] {
  return suite
    .filter((test) => test.status === 'failed')
    .map((test) => test.title);
}
