const net = require('node:net')
const readline = require('readline/promises')

const PORT = 8080
const HOST = '192.168.0.247'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve()
    })
  })
}

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve()
    })
  })
}

let id;

const client = net.createConnection({
  host: HOST,
  port: PORT,
}, async () => {
  console.log('Connected to the server!');
  

  const ask = async () => {
    const message = await rl.question('Enter a message >')
    await moveCursor(0, -1)
    await clearLine(0)
    client.write(`${id}:Message-${message}`)
  }

  ask()

  client.on('data', async (data) => {
    // log empty line
    console.log();

    await moveCursor(0, -1)
    await clearLine(0)

    if (data.toString('utf-8').substring(0, 2) === 'ID') {
      id = data.toString('utf-8').substring(3)
      console.log(`Your ID is:${id}!\n`);

    } else {
      console.log(data.toString('utf-8'));
    }
    ask()
  })
})

client.on('end', () => {
  console.log('The connection was ended!');
})

