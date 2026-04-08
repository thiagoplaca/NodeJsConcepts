const cpeak = require("cpeak");

const server = new cpeak()
const PORT = 8080

server.route('get', '/', (req, res) => {
  res.json({ message: 'This is some text' })
})

server.route('get', '/heavy', (req, res) => {
  for (let i = 0; i < 1e10; i++) { }
  res.json({ message: 'Operation is done.' })
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
