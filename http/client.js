const http = require('node:http')

const agent = new http.Agent({keepAlive: true})

const request = http.request({
  agent: agent,
  host: 'localhost',
  port: 8080,
  method: 'POST',
  path: '/create-post',
  headers: {
    'content-type': 'application/json',
    'name': 'Thiago'
  }
})

request.on('response', (response) => {
  console.log('-----STATUS-----');
  console.log(response.statusCode);
  
  console.log('-----HEADERS-----');
  console.log(response.headers);
  
  console.log('-----BODY-----');
  response.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
    
  })

  response.on('end', () => {
    console.log('No more data.');
    
  })
  
})

request.write(JSON.stringify(
  {
    title: 'Title of my Post',
    body: 'Some text, bro!'
  }
))

request.end()

