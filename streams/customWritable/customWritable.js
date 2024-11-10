const { Writable } = require('node:stream');
const fs = require('node:fs');


class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark })

    this.fileName = fileName
    this.fd = null
    this.chunks = []
    this.chunksSize = 0
    this.writesCount = 0
  }

  _construct(callback) {
    fs.open(this.fileName, 'w', (err, fd) => {
      if (err) {
        callback(err)
      } else {
        this.fd = fd
        callback()
      }
    })
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk)
    this.chunksSize += chunk.length

    if (this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err)
        }
        this.chunks = []
        this.chunksSize = 0
        ++this.writesCount
        callback()
      })
    } else {
      callback();
    }
  }

  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err)

        this.chunks = []
        callback()
    })
  }

  _destroy(error, callback) {
    console.log('Number of writes:', this.writesCount);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error)
      })
    } else {
      callback(error)
    }
  }

}

(async () => {
    console.time('writeMany')
    const stream = new FileWriteStream({
      fileName: 'text.txt',
    })

    let i = 0

    const numberOfWrites = 1000000

    const writeMany = () => {
      while (i < numberOfWrites) {
        const buff = Buffer.from(` ${i} `, 'utf-8')

        if (i === numberOfWrites - 1) {
          return stream.end(buff)
        }

        if (!stream.write(buff)) {
          break;
        }

        i++
      }
    }

    writeMany()

    stream.on('drain', () => {
      writeMany()
    })

    stream.on('finish', () => {
      console.timeEnd('writeMany');
    })

  })()