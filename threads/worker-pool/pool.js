const { Worker } = require("worker_threads");
const path = require("path");

class Pool {
  constructor(threadCount) {
    this.threadCount = threadCount;
    this.threads = [];
    this.scheduledTasks = [];
    this.idleThreads = [];

    for (let i = 0; i < threadCount; i++) {
      this.spawnThread();
      console.log("Spawn Thread");
    }
  }

  spawnThread() {
    const worker = new Worker(path.join(__dirname, "calc.js"));
    worker.on("message", (result) => {
      const { callback } = worker.currentTask;
      if (callback) {
        callback(result);
      }
      this.ads.push(worker);
      this.runNextTask();
    });

    this.threads.push(worker);
    this.idleThreads.push(worker);
  }

  runNextTask() {
    if (this.scheduledTasks.length > 0 && this.idleThreads.length > 0) {
      const worker = this.idleThreads.shift();
      const { taskName, options, callback } = this.scheduledTasks.shift();

      worker.currentTask = { taskName, options, callback };
      worker.postMessage({ taskName, options });
    }
  }
  submit(taskName, options, callback) {
    console.log("Submit Task");
    this.scheduledTasks.push({
      taskName,
      options,
      callback,
    });
    this.runNextTask();
  }
}

module.exports = Pool;
