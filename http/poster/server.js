const Butter = require('../butter')

const USERS = [
  { id: 1, name: 'James', username: 'James', password: 'strong'}
]

const POSTS = [
  { 
    id: 1, 
    title: 'This is a title.',
    body: 'This is some random text.',
    userId: 1
  }
]

const sessions = []

const PORT = 8080
const server = new Butter()

// Auth
server.beforeEach((req, res, next) => {
  const routesToAuth = [
    "GET /api/user",
    "PUT /api/user",
    "POST /api/posts",
    "DELETE /api/logout"
  ]

  if(routesToAuth.indexOf(req.method + " " + req.url) !== -1) {
    if(req.headers.cookie) {
      const token = req.headers.cookie.split("=")[1]
      const session = sessions.find((session) => session.token === token)
      if(session) {
        req.userId = session.userId
        return next()
      }
    }

    return res.status(401).json({error: 'Unauthorized'})
    
  } else {
    next()
  }

})

server.beforeEach((req, res, next) => {
  if(req.headers['content-type'] === 'application/json') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString('utf-8')
    })

    req.on('end', () => {
      body = JSON.parse(body)
      req.body = body
      return next()
    })
  } else {
    next()
  }
})

server.beforeEach((req, res, next) => {
  const routes = ['/', '/login', '/profile', 'new-post']

  if(routes.indexOf(req.url) !== -1 && req.method === 'GET') {
    return res.status(200).sendFile('./public/index.html', 'text/html')
  } else {
    next()
  }
})
server.route('get', '/styles.css', (req, res) => {
  res.sendFile('./public/styles.css', 'text/css')
})
server.route('get', '/scripts.js', (req, res) => {
  res.sendFile('./public/scripts.js', 'text/javascript')
})

// ------ JSON ROUTES ------ //
server.route('post', '/api/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = USERS.find((user) => username === user.name)

    if (user && user.password === password) {
      const token = Math.floor(Math.random() * 1000000).toString()
      sessions.push({ userId: user.id, token})
      res.setHeader('Set-Cookie', `token=${token}; Path=/`)

      res.status(200).json({ message: 'Logged in succesfully! ;)'})
    } else {
      res.status(401).json({ error: 'Invalid username or password.'})
    }
})

server.route('delete', '/api/logout', (req, res) => {
  const sessionIndex = sessions.findIndex((el) => el.userId === req.userId)

  if(sessionIndex > -1) {
    sessions.splice(sessionIndex, 1)
  }

  res.setHeader('Set-Cookie', `token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`)
  res.status(200).json({message: 'Logged out successfully!'})
})

server.route('get', "/api/user", (req, res) => {
  const user = USERS.find((user) => user.id === req.userId)
  res.json({
    username: user.username,
    name: user.name
  })
})

server.route('put', "/api/user", (req, res) => {
  const username = req.body.username
  const name = req.body.name
  const password = req.body.password

  const user = USERS.find((user) => user.id === req.userId)

  user.username = username
  user.name = name

  if(password) {
    user.password = password
  } 

  res.status(200).json({
    username: user.username,
    name: user.name,
    password: password ? 'Password Upteded' : ''
  })
})

server.route('get', '/api/posts', (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId)
    post.author = user.name
    return post
  })
  res.status(200).json(posts)
})

server.route('post', "/api/posts", (req, res) => {
  const title = req.body.title
  const body = req.body.body

  const post = {
    id: POSTS.length + 1,
    title: title,
    body: body,
    userId: req.userId
  }

  POSTS.unshift(post)
  res.status(201).json({post})
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:8080`);
})

