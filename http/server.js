const http = require('node:http')

const server = http.createServer()

server.on('request', (request, response) => {

  console.log('----- Methods: -----');
  console.log(request.method);

  console.log('----- URL: -----');
  console.log(request.url);

  console.log('----- HEADERS: -----');
  console.log(request.headers);

  request.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
    
  })

})


server.listen(8050, () => {
  console.log('Server Listening on http://localhost:8050');
  
})