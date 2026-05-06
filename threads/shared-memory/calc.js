const { threadId, workerData } = require("worker_threads");

const data = Buffer.from(workerData.data);

data[threadId] = 255;

console.log(`Thread ${threadId} data: `, data);
