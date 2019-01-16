import express from 'express'
import { userApp } from './userApp'
import { todoApp } from './todoApp'
import { sessionApp } from './sessionApp'
import { authenticationMiddleware } from './middlewares'

export const server = express()

server.use(express.json())
server.use(authenticationMiddleware)

server.use('/users', userApp)
server.use('/todos', todoApp)
server.use('/session', sessionApp)
