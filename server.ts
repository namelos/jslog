import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import { AuthenticationMiddleware } from './AuthenticationMiddleware'
import { JsonMiddleware } from './JsonMiddleware '
import { sessionApp } from './sessionApp'
import { todoApp } from './todoApp'
import { TodoController } from './TodoController'
import { UserController } from './UserController'

export const server = createExpressServer({
  controllers: [UserController, TodoController],
  middlewares: [JsonMiddleware, AuthenticationMiddleware]
})

server.use('/session', sessionApp)
