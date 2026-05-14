const { workerData } = require("worker_threads");

const number = new Uint32Array(workerData.number);

for (let i = 0; i < 500_000; i++) {
  Atomics.add(number, 0, 1);

  // number[0] = number[0] + 1;
}
