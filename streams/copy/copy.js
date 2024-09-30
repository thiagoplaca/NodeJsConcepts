const { pipeline } = require('node:stream');
const fs = require('node:fs/promises');


// Memory Usage: 1 GB
/* (async() => {
  const destFile = await fs.open('test-copy.txt', 'w')
  const result = await fs.readFile('big-text.txt')

  await destFile.write(result)

  setInterval(() => {}, 1000)

})() */

/* (async() => {
  console.time('Copy')

  const srcFile = await fs.open('small-text.txt','r')
  const destFile = await fs.open('text-copy.txt', 'w')

  let bytesRead = -1

  while(bytesRead !== 0) {
    const readResult = await srcFile.read()
    bytesRead = readResult.bytesRead

    if(bytesRead !== 16384) {
      const indexOfNotFilled = readResult.buffer.indexOf(0)
      const newBuffer = Buffer.alloc(indexOfNotFilled)
      readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled)
      destFile.write(newBuffer)
    } else {
      destFile.write(readResult.buffer)
    }
  }

  console.timeEnd('Copy')
})() */


(async() => {
  console.time('Copy')

  const srcFile = await fs.open('small-text.txt','r')
  const destFile = await fs.open('text-copy.txt', 'w')

  const readStream = srcFile.createReadStream()
  const writeStream = destFile.createWriteStream()
  

  readStream.pipe(writeStream)
  readStream.on('end', () => {
    console.timeEnd('Copy')
    
  })

})()

