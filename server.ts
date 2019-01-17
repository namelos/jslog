import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import { AuthenticationMiddleware } from './AuthenticationMiddleware'
import { JsonMiddleware } from './JsonMiddleware '
import { SessionController } from './SessionController'
import { TodoController } from './TodoController'
import { UserController } from './UserController'

export const server = createExpressServer({
  controllers: [UserController, SessionController, TodoController],
  middlewares: [JsonMiddleware, AuthenticationMiddleware]
})

