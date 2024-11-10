const net = require('node:net')

const server = net.createServer()
const PORT = 8080
const HOST = '192.168.0.247'

const clients = []

server.on('connection', (socket) => {
  console.log('A new connection to the server! :)');

  const clientId = clients.length + 1

  clients.map((client) => {
    client.socket.write(`User ${clientId} Joined!`)
  })

  socket.write(`ID: ${clientId}`)

  socket.on('data', (data) => {
    const dataString = data.toString('utf-8')
    const id = dataString.substring(0, dataString.indexOf(':'))
    const message = dataString.substring(dataString.indexOf(':Message-') + 9)
    clients.map((client) => {
      client.socket.write(`> User${id}: ${message}`)
    })

  })

  socket.on('end', () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId}: left!`)
    })
  })

  clients.push({
    id: clientId.toString(),
    socket: socket,
  })
})


server.listen(PORT, HOST, () => {
  console.log('Opened Server On:', server.address());

})