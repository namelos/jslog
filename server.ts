import 'reflect-metadata'
import { Container } from 'typedi'
import { createConnection, useContainer as typeormUseContainer } from 'typeorm'
import { createExpressServer, useContainer as routingControllersUseContainers } from 'routing-controllers'
import { Session } from './entities/Session'
import { Todo } from './entities/Todo'
import { User } from './entities/User'
import { AuthenticationMiddleware } from './middlewares/AuthenticationMiddleware'
import { SessionController } from './controllers/SessionController'
import { TodoController } from './controllers/TodoController'
import { UserController } from './controllers/UserController'
import { JsonMiddleware } from './middlewares/JsonMiddleware '

typeormUseContainer(Container)
routingControllersUseContainers(Container)

export async function connectToDatabase() {
  return await createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, Session, Todo],
    synchronize: true
  })
}

export function createServer() {
  return createExpressServer({
    controllers: [UserController, SessionController, TodoController],
    middlewares: [JsonMiddleware, AuthenticationMiddleware]
  })
}
