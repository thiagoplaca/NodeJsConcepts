const { Worker } = require("worker_threads");

let result = [];
const THREADS = 8;
const count = 200;
let completed = 0;

for (let i = 0; i < THREADS; i++) {
  console.time("Time Taken");
  const worker = new Worker("./calc.js", {
    workerData: { count: count / THREADS, start: 1e14 + i * 300 },
  });
  const threadId = worker.threadId;
  console.log(`Worker ${threadId} started.`);
  worker.on("message", (primes) => {
    result = result.concat(primes);
  });
  worker.on("erro", (err) => {
    console.error(err);
  });
  worker.on("exit", (code) => {
    completed++;

    if (completed === THREADS) {
      console.timeEnd("Time Taken");
      console.log(result.sort());
    }

    if (code !== 0) {
      console.error(`Worker ${threadId} exited with code ${code}`);
    }
    console.log(`Worker ${threadId} exited.`);
  });
}
