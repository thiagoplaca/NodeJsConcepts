const { Transform } = require('node:stream')
const fs = require('node:fs/promises')

class Decrypt extends Transform {
  constructor(totalSize) {
    super()
    this.totalSize = totalSize
    this.bytesProcessed = 0
  }

  _transform(chunk, enconding, callback) {
    for (let i = 0; i < chunk.length; ++i) {
      if (chunk[i] !== 255) {
        chunk[i] = chunk[i] - 1
      }
    }

    this.bytesProcessed += chunk.length
    this.showProgress()

    callback(null, chunk)
  }

  showProgress() {
    const progress = (this.bytesProcessed / this.totalSize) * 100
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    process.stdout.write(`Progress: ${progress.toFixed(2)}%`)
  }
}

(async () => {
  const readFileHandle = await fs.open('write.txt', 'r')
  const writeFileHandle = await fs.open('decrypted.txt', 'w')

  const readStream = readFileHandle.createReadStream()
  const writeStream = writeFileHandle.createWriteStream()

  const readFileInfo = await readFileHandle.stat()
  const sizeFile = readFileInfo.size

  const decrypt = new Decrypt(sizeFile)

  readStream.pipe(decrypt).pipe(writeStream)
  .on('finish', () => {
    console.log('\nDecryption Done!')
    })
})()


