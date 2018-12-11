const express = require('express')
const { userRepository } = require('./repositories')

const server = express()
server.use(express.json())

server.get('/users', (request, response) => {
  return userRepository.all()
    .then(results => response.json(results))
})

server.post('/users', (request, response) => {
  const user = User(request.body)
  return userRepository.insert(user)
    .then(x => response.json(x))
})

function User(params) {
  return { username: params.username }
}

module.exports = {
  server
}