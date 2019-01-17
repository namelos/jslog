import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import { AuthenticationMiddleware } from './middlewares/AuthenticationMiddleware'
import { SessionController } from './controllers/SessionController'
import { TodoController } from './controllers/TodoController'
import { UserController } from './controllers/UserController'
import { JsonMiddleware } from './middlewares/JsonMiddleware '

export const server = createExpressServer({
  controllers: [UserController, SessionController, TodoController],
  middlewares: [JsonMiddleware, AuthenticationMiddleware]
})

