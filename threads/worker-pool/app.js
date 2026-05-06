const Pool = require("./pool");
const { performance } = require("perf_hooks");

const numWorkers = 4;
const pool = new Pool(numWorkers);

let result = [];
let tasksDone = 0;
const totalTasks = 20000;
const start = performance.now();

for (let i = 0; i < totalTasks; i++) {
  if (i % 5 === 0) {
    pool.submit(
      "factorial",
      {
        n: BigInt(i),
      },
      (factorialResult) => {
        console.log(`Factorial of ${i} is: `);
        console.log(factorialResult);
        tasksDone++;

        if (tasksDone === totalTasks) {
          console.log(
            `Time taken: ${(performance.now() - start).toFixed(2)}ms`,
          );
          console.log(result.sort());
          process.exit(0);
        }
      },
    );
  } else {
    pool.submit(
      "generatePrimes",
      {
        count: 20,
        start: 10_000_000_000 + i * 500,
        format: true,
        log: false,
      },
      (primes) => {
        tasksDone++;

        result = result.concat(primes);

        if (tasksDone === totalTasks) {
          console.log(
            `Time taken: ${(performance.now() - start).toFixed(2)}.ms`,
          );
          console.log(result.sort());
          process.exit(0);
        }
      },
    );
  }
}
