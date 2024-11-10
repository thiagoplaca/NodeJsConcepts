const net = require('net')
const fs = require('node:fs/promises')
const path = require('path')


const socket = net.createConnection({
  host: '::1',
  port: 5050,
}, async () => {

  const filePath = process.argv[2]
  const fileName = path.basename(filePath)

  const fileHandle = await fs.open(filePath, 'r')
  const FileReadStream = fileHandle.createReadStream()

  const fileSize = (await fileHandle.stat()).size
  const fileSizeGb = (fileSize / (1024 * 1024 * 1024)).toFixed(2)

  let uploadedPercentage = 0
  let bytesUploaded = 0
  let startTime = Date.now()

  socket.write(`FileName: ${fileName}-------`)

  // Reading Source File
  FileReadStream.on('data', (data) => {
    if (!socket.write(data)) {
      FileReadStream.pause()
    }

    bytesUploaded += data.length
    let uploadedGB = (bytesUploaded / (1024 * 1024 * 1024)).toFixed(2)
    let newPercentage = Math.floor((bytesUploaded / fileSize) * 100)

    if (newPercentage !== uploadedPercentage) {
      uploadedPercentage = newPercentage

      const elapsedTime = Date.now() - startTime
      const minutes = Math.floor(elapsedTime / 1000 / 60)
      const seconds = Math.floor(elapsedTime / 1000 % 60)

      process.stdout.clearLine(0)
      process.stdout.cursorTo(0)

      process.stdout.write(`Progress: ${newPercentage}% - ${uploadedGB}GB of ${fileSizeGb}GB. | ${minutes} Minutes ${seconds}s.`)

    }
  })

  socket.on('drain', () => {
    FileReadStream.resume()
  })

  FileReadStream.on('end', () => {
    console.log('\nThe File was sucessfuly uploaded');
    socket.end()
  })
})