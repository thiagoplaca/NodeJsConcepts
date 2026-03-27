const fs = require('node:fs/promises');

/* (async () => {
  console.time('writeMany')
  const fileHandle = await fs.open('test.txt', 'w');

  for (let i = 0; i < 1000000; i++) {
    await fileHandle.write(` ${i} `);
  }

  console.timeEnd('writeMany');
})() */

/* (async () => {
    console.time('writeMany')
    const fileHandle = await fs.open('test.txt', 'w');
    const stream = fileHandle.createWriteStream();
    for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(` ${i} `, 'utf-8')
      stream.write(buff);
    }
    console.timeEnd('writeMany');
})() */


(async () => {
  console.time('writeMany')
  const fileHandle = await fs.open('bigFile.txt', 'w');
  const stream = fileHandle.createWriteStream();

  /* console.log(stream.writableHighWaterMark);

  const buff = Buffer.alloc(16384, 10)
  console.log(stream.write(buff)) */

  let i = 0
  let numberOfWrites = 1e8

  const writeMany = () => {
    let canWrite = true
    while (i < numberOfWrites && canWrite) {
      const buff = Buffer.from('a', 'utf-8')

      if(i === numberOfWrites - 1) {
        stream.end(buff)
        break
      }

      canWrite = stream.write(buff)

      i++
    }
  }

  writeMany()

  stream.on('drain', () => {
    writeMany()
  })

  stream.on('finish', () => {
    console.timeEnd('writeMany');
    fileHandle.close() 
  })
  
})()