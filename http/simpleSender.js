const net = require('net')

const socket = net.createConnection({
  host: '127.0.0.1',
  port: 8080,
}, () => {
  const req = 
  socket.write(result)
})

socket.on('data', (chunk) => {
  console.log('Received Response:');
  console.log(chunk.toString('utf-8'));
  socket.end()
})

socket.on('end', () => {
  console.log('Connection Close :)');
  
})


