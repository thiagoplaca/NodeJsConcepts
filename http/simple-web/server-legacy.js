const http = require('node:http')
const fs = require('node:fs/promises')
const { PassThrough } = require('node:stream')
const { memoryUsage } = require('node:process')

const server = http.createServer()

server.on('request', async (req, res) => {

  if(req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')

    const fileHandle = await fs.open('./public/index.html', 'r')
    const fileStream = fileHandle.createReadStream()


    fileStream.pipe(res)
  }

  if(req.url === '/style.css' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/css')

    const fileHandle = await fs.open('./public/style.css', 'r')
    const fileStream = fileHandle.createReadStream()


    fileStream.pipe(res)
  }

  if (req.url === '/house.png' && req.method === 'GET') {
    res.setHeader('Content-Type', 'image/png')

    const fileHandle = await fs.open('./public/house.png', 'r')
    const fileStream = fileHandle.createReadStream()


    fileStream.pipe(res)
  }

  if (req.url === '/script.js' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/javascript')

    const fileHandle = await fs.open('./public/script.js', 'r')
    const fileStream = fileHandle.createReadStream()


    fileStream.pipe(res)
  }

  if(req.url === '/login' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json')

    res.statusCode = 200

    const body = {
      message: 'Loggin you in...'
    }

    res.end(JSON.stringify(body))
  }

  if(req.url === '/user' && req.method === 'PUT') {
    res.setHeader('Content-Type', 'application/json')

    res.statusCode = 200

    const body = {
      message: 'You have to first log in...'
    }

    res.end(JSON.stringify(body))
  }

  if(req.url === '/user' && req.method === 'PUT') {
    res.setHeader('Content-Type', 'application/json')

    res.statusCode = 200

    const body = {
      message: 'You have to first log in...'
    }

    res.end(JSON.stringify(body))
  }

  if(req.url === '/upload' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json')
     
    const totalByte = parseInt(req.headers['content-length']) 
    let bytesRecebidos = 0

    const fileHandle = await fs.open('./storage/video.mp4', 'w')
    const fileStream = fileHandle.createWriteStream()

    req.on('data', (chunk) => {
      bytesRecebidos += chunk.length

      const progress = ((bytesRecebidos / totalByte) * 100).toFixed(2)
      const receivedMB = (bytesRecebidos / (1024 * 1024)).toFixed(2)
      const receivedGB = (bytesRecebidos / (1024 * 1024 * 1024)).toFixed(2)
      const totalMB = (bytesRecebidos / (1024 * 1024)).toFixed(2)
      const totalGB = (bytesRecebidos / (1024 * 1024 * 1024)).toFixed(2)

      if (totalByte > 1e9) {
        process.stdout.write(`Progress: ${progress}% (${receivedGB}/${totalGB} GB) \r`)
      } else {
        process.stdout.write(`Progress: ${progress}% (${receivedMB}/${totalMB} MB)`)
      }

      if(!fileStream.write(chunk)) {
        req.pause()
        fileStream.once('drain', () => req.resume())
      }

    })


    req.on('end', () => {
      console.log('\nNo more data to be consumed.');
      fileStream.end()
    })

    fileStream.on('finish', () => {
      console.log('\nAll writes are now complete');
      res.end(JSON.stringify({
        message: 'File was uploaded successfully!'
      }))
    })

    req.on('error', (err) => {
      console.error(err)
      res.statusCode = 500
      res.end('Upload Failed')
    })

  }
})

server.listen(8080, () => {
  console.log(`Web Server running at http://localhost:8080`)
})