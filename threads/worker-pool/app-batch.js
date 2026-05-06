const Pool = require("./pool");
const { performance } = require("perf_hooks");

const numWorkers = 4;
const pool = new Pool(numWorkers);

let result = [];
let tasksDone = 0;
const totalTasks = 200_000;
const batchSize = 1_000;
let batchIndex = 0;
const start = performance.now();

function submitBatch(startIndex, endIndex) {
  let batchTaskCount = 0;
  for (let i = startIndex; i < endIndex; i++) {
    batchTaskCount++;
    pool.submit(
      "generatePrimes",
      {
        count: 20,
        start: 1_000_000_000 + i * 500,
        format: true,
        log: false,
      },
      (primes) => {
        tasksDone++;
        batchTaskCount--;

        result = result.concat(primes);

        if (tasksDone === totalTasks) {
          console.log(`Time taken: ${performance.now() - start}ms`);
          console.log(result.sort());
          process.exit(0);
        }

        if (batchTaskCount === 0) {
          batchIndex++;
          submitNextBatch();
        }
      },
    );
  }
}

function submitNextBatch() {
  if (batchIndex * batchSize < totalTasks) {
    const startIndex = batchIndex * batchSize;
    const endIndex = Math.min((batchIndex + 1) * batchSize, totalTasks);
    submitBatch(startIndex, endIndex);
  }
}
submitNextBatch();
