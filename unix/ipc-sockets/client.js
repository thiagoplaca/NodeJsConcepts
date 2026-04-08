const net = require('net');

const client = net.createConnection({ path: '/tmp/node_c_socket' })

client.on('connect', () => {
  console.log('Connected to the C Server')
})

const b = Buffer.alloc(8)
b[0] = 0x12
b[1] = 0x54
b[2] = 0xfa

client.end(b)

client.on('data', () => {
  console.log('Received from the C Server:', data.toString('utf-8'))
})

client.on('end', () => {
  console.log('Connection closed by the server')
})

client.on('err', () => {
  console.log('Error:', err.message)
})
