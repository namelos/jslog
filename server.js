const express = require('express')
const server = express()

server.use(express.static('public'))
server.use(express.json())

server.get('/hello', (request, response) => {
  response.send('hello')
})

module.exports = server