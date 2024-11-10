const net = require('net')

const socket = net.createConnection({
  host: '127.0.0.1',
  port: 3099,
}, () => {
  const emoji = Buffer.from('F09F9984', 'hex')
  const result = emoji.toString('utf-8')
  socket.write(result)
})