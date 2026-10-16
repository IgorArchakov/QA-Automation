class Bug {
  readonly id: string;
  status: string;

  constructor(id: string) {
    this.id = id;
    this.status = 'Open';
  }

  close(): void {
    this.status = 'Done';
  }
}

const bug = new Bug('CAR-12345');

bug.close();
console.log(bug.status);
//bug.id = 'CAR-9999';
//console.log(bug.id);

const bug2 = new Bug('CAR-5464');
console.log(bug2.status);

type TestResult = 'passed' | 'failed';

class TestRun {
  readonly name: string;
  results: TestResult[];

  constructor(name: string) {
    this.name = name;
    this.results = [];
  }

  addResult(result: TestResult): void {
    this.results.push(result);
  }

  passRate(): number {
    const runsTotal = this.results.length;
    if (runsTotal === 0) {
      return 0;
    }
    const runsPassed = this.results.filter(
      (result) => result === 'passed',
    ).length;

    const passRate = (runsPassed / runsTotal) * 100;
    return passRate;
  }
}

const loginRunTest = new TestRun('Login');
const emptyRun = new TestRun('Empty');

loginRunTest.addResult('passed');
loginRunTest.addResult('passed');
loginRunTest.addResult('failed');
loginRunTest.addResult('passed');
loginRunTest.addResult('failed');

console.log(loginRunTest.results);
console.log(loginRunTest.passRate());
console.log(emptyRun.passRate());

const loginRun: TestRun[] = [
  new TestRun('Login'),
  new TestRun('Login with Invalid User'),
  new TestRun('Login with Blocked User'),
  new TestRun('Login with Admin'),
  new TestRun('Login without password'),
];

//loginRun.addResult('passed');
