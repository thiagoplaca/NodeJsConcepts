const { parentPort } = require("worker_threads");
const generatePrimes = require("./prime-generator.js");
const factorial = require("./factorial.js");

parentPort.on("message", ({ taskName, options }) => {
  switch (taskName) {
    case "generatePrimes":
      const primes = generatePrimes(options.count, options.start, {
        format: options.format,
        log: options.log,
      });
      parentPort.postMessage(primes);
      break;
    case "factorial":
      const result = factorial(options.n);
      parentPort.postMessage(result);
      break;
    default:
      parentPort.postMessage("Unknown task");
  }
});
