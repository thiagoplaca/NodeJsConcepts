const cluster = require('node:cluster')

if (cluster.isPrimary) {
  console.log(`This is the Parent process ${process.pid}`)

  const coresCount = require('node:os').availableParallelism()

  for (let i = 0; i < coresCount; i++) {
    const worker = cluster.fork()
    console.log(`The parent process spawned a new child process with PID ${worker.process.pid} `)
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} ${signal || code} died.Restarting...`)
    cluster.fork()
  })
} else {
  require('./server.js')
}
