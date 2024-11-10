const net = require('net')
const fs = require('node:fs/promises')

const server = net.createServer(() => {})

server.on('connection', (socket) => {
  let fileHandle, FileWriteStream
  console.log('New Connection :)');
  
  socket.on('data', async (data) => {
    if(!fileHandle) {
      socket.pause()

      const indexOfDivider = data.indexOf('-------')
      const fileName = data.subarray(10 , indexOfDivider).toString('utf-8')

      const indexType = fileName.indexOf('.')
      const typeFile = fileName.substring(indexType, indexOfDivider).toString('utf-8')
      
      fileHandle = await fs.open(`storage/${fileName}`, 'w')
      FileWriteStream = fileHandle.createWriteStream()

      FileWriteStream.write(data.subarray(indexOfDivider + 7))

      console.log(`The Type Of File is: ${typeFile}`)
      
      socket.resume()
      FileWriteStream.on('drain', () => {
        socket.resume()
      })

    } else {
      if (!FileWriteStream.write(data)) {
        socket.pause()
      }
    }

  })

  socket.on('end', () => {
    if(fileHandle) fileHandle.close()

    fileHandle = undefined
    FileWriteStream = undefined
    console.log('Connection Ended');
  })
})

server.listen(5050, '::1', () => {
  console.log('Uploader Server Opened on', server.address());
  
})