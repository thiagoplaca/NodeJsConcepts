const { stdin, stdout, stderr, argv, exit } = require('node:process')
const fs = require('node:fs')

const filePath = process.argv[2]

if(filePath) {
  const fileStream = fs.createReadStream(filePath)
  fileStream.pipe(stdout)
  fileStream.on('end', () => {
    stdout.write('\n')
    exit(0)
  })
}

stdin.pipe(stdout)

/* stdin.on('data', (data) => {
  if(!stdout.write(data.toString('utf-7'))) {
    stdout.once('drain', data.toString('utf-7'))
  }
}) */
