const { spawn } = require('node:child_process')
const fs = require('node:fs')

const numberFormater = spawn('number_formatter', ['./dest.txt', '$', ','])

numberFormater.stdout.on('data', (data) => {
  console.log('Stdout:', data);
})

numberFormater.stderr.on('data', (data) => {
  console.log('Stderr:', data);
})

numberFormater.on('close', (code) => {
  if(code === 0) {
    console.log('The File was read, processed and written succesfully');
  } else {
    console.log('Something bad happened!');
  }
})

const fileStream = fs.createReadStream("./src.txt")
fileStream.pipe(numberFormater.stdin)
