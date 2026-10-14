import type { TestResult } from '../Lesson4/lesson4.js';
import { testRun } from '../Lesson4/lesson4.js';

//literal union types
type Status = 'passed' | 'failed' | 'skipped';
let s: Status = 'passed';
console.log(s);

//Narrowing types
function describe(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(1);
}

//1
type Severity = 'low' | 'medium' | 'high' | 'critical';
function getSlaHours(severity: Severity): number {
  switch (severity) {
    case 'critical':
      return 4;
    case 'high':
      return 24;
    case 'medium':
      return 72;
    case 'low':
      return 168;
  }
}

getSlaHours('low');

//2
function formatDuration(ms: number | null): string {
  if (ms === null) {
    return 'Empty duration';
  }
  return `${ms}ms`;
}

console.log(formatDuration(5.3231));

// 3
function findTest(run: TestResult[], id: number): TestResult | undefined {
  return run.find((test) => test.id === id);
}

const found = findTest(testRun, 2);
if (found) {
  // проверка: внутри ветки undefined отброшен
  console.log(found.title); // found: TestResult — компилятор доволен
} else {
  console.log(`Test not found`);
}
//console.log(found)             // found: TestResult | undefined — компилятор не доволен
