//Task 1
const n = 7;
console.log(`${n > 5 ? 'big' : 'small'}-${n}`); // big-7
console.log(`${n % 2 === 0 ? '✅' : '❌'} even check`); //'❌' even check
console.log('result: ' + n + 1); // result 71
console.log(`result: ${n + 1}`); //result 8

function formatBugTitle(id: number, title: string, isBlocker: boolean): string {
  return `[CAR-${id}]${isBlocker === true ? '[BLOCKER]' : ''} ${title}`;
}

console.log(formatBugTitle(123, 'Login fails', true));

//Task 2
const cases = [
  'Smoke: login',
  'smoke: logout',
  'Regression: profile',
  'SMOKE API',
];
console.log(cases.filter((c) => c.includes('Smoke')).length); //1
console.log(cases.filter((c) => c.toLowerCase().includes('smoke')).length); //3
console.log(cases.length); //4

type TestStatus = 'passed' | 'failed' | 'skipped';

export interface TestResult {
  readonly id: number;
  name: string;
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
    name: 'Test Case 1',
    status: 'passed',
    durationMs: 1000,
  },
  {
    id: 2,
    name: 'Test Case 2',
    status: 'failed',
    durationMs: 2000,
    bugId: 'CAR-1234',
  },
  {
    id: 3,
    name: 'Test Case 3',
    status: 'passed',
    durationMs: 500,
  },
  {
    id: 4,
    name: 'Test Case 4',
    status: 'skipped',
    durationMs: 0,
  },
  {
    id: 5,
    name: 'Test Case 5',
    status: 'failed',
    durationMs: 1500,
    bugId: 'CAR-5678',
  },
  {
    id: 6,
    name: 'Test Case 6',
    status: 'passed',
    durationMs: 1000,
  },
];

function getSlowTests(
  results: { name: string; durationMs: number }[],
  thresholdMs: number,
): string[] {
  return results.filter((r) => r.durationMs > thresholdMs).map((r) => r.name);
}

console.log(getSlowTests(testRun, 1000));

//Task 3
const retry = (name: string, attempts: number = 3): string =>
  `${name}: ${attempts} attempts`; // это функцвия, которая врзврашает строку с одним дефолтным параметром
console.log(retry('Login')); // тут возваращается Логин и дефолтный параметр 3, потому что я не передавал attempts
console.log(retry('Login', 0)); //тут возваращается Логин и параметр 0, потому что я передавал attempts 0
console.log(retry('Login', undefined)); //мне кажется тут будет ошибка, так как  я передaл стринг и андефайнд

function safeDivide(a: number, b: number): number | null {
  return b === 0 ? null : a / b;
}

function formatRate(a: number, b: number): string {
  const rate = safeDivide(a, b);
  if (rate === null) {
    return 'n/a';
  } else {
    return `${rate.toFixed(1)}%`;
  }
}

console.log(formatRate(5, 0));
console.log(formatRate(5, 2));

//4
const run = [
  // массив объектов с тестами
  { status: 'passed', ms: 100 },
  { status: 'failed', ms: 300 },
  { status: 'passed', ms: 200 },
];
console.log(run.reduce((acc, t) => acc + t.ms, 0)); //600 - сумма всех ms
console.log(
  run.reduce((acc, t) => (t.status === 'passed' ? acc + t.ms : acc), 0),
); //300 - сумма ms только для тех объектов, у которых статус passed
console.log(
  run.filter((t) => t.status === 'passed').reduce((acc, t) => acc + t.ms, 0),
); //300 - сумма ms только для тех объектов, у которых статус passed

interface FlakyTest {
  title: string;
  runs: boolean[];
}

const flakyTests: FlakyTest[] = [
  { title: 'Login test', runs: [true, true, false, true] },
  { title: 'Checkout test', runs: [false, true, false] },
  { title: 'Profile test', runs: [true, true, true] },
  { title: 'Product test', runs: [false, false, true] },
];

function getFlakiness(test: FlakyTest): number {
  return (
    (test.runs.filter((r) => r.valueOf() === false).length / test.runs.length) *
    100
  );
}

function findFlakiest(tests: FlakyTest[]): FlakyTest {
  return tests.reduce((flakiest, test) =>
    getFlakiness(test) >= getFlakiness(flakiest) ? test : flakiest,
  );
}

console.log(findFlakiest(flakyTests)); // у меня их 2, а вернулся один

//5
type Env = 'dev' | 'staging' | 'prod';
function getUrl(env: Env): string {
  return `https://${env}.inspiren.com`;
}

getUrl('staging'); // вернется https://staging.inspiren.com
//getUrl('production') //вернутся ошибка 2345
const e = 'dev';
getUrl(e); //вернется https://dev.inspiren.com`
//let e2 = 'dev'
//getUrl(e2) //вернется ошибка 2345, так как e2 имеет тип string, а кроме того, он может поменяться в будущем!!

const bugNumbers: string[] = ['CAR-12', 'BUG-7', 'CAR-oops', 'CAR-300'];

function parseTestId(bugNumber: string): number | null {
  //разбираем строку на части и возвращаем число, если оно есть, иначе null. А потом всю эту логику прогоняем через массив bugNumbers
  if (!bugNumber.startsWith('CAR-')) {
    return null;
  }
  const idPart = Number(bugNumber.slice(4));
  if (Number.isNaN(idPart)) {
    return null;
  }
  return idPart;
}

const parsedIds = bugNumbers.map(parseTestId).filter((id) => id !== null); //Прогоняем функцию parseTestId через массив bugNumbers
console.log(parsedIds); // [12, 300] - вернулись только те числа, которые были после CAR- в строке
