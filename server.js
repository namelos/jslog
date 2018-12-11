const express = require('express')
const server = express()

server.use(express.static('public'))
server.use(express.json())

server.get('/users', (request, response) => {
  response.json(db.users)
})

server.post('/users', (request, response) => {
  const user = User(request.body)
  db.users.push(user)
  response.json(user)
})

const db = {
  users: [],
  reset: function() {
    db.users = []
  }
}

function User(params) {
  return { username: params.username }
}

module.exports = {
  server,
  db
}