const express = require('express')
const userApp = require('./userApp')
const todoApp = require('./todoApp')
const sessionApp = require('./sessionApp')
const { authenticationMiddleware } = require('./middlewares')

const server = express()

server.use(express.json())
server.use(authenticationMiddleware)

server.use('/users', userApp)
server.use('/todos', todoApp)
server.use('/session', sessionApp)

module.exports = {
  server
}
