import { createExpressServer } from 'routing-controllers'
import { AuthenticationMiddleware } from './AuthenticationMiddleware'
import { JsonMiddleware } from './JsonMiddleware '
import { sessionApp } from './sessionApp'
import { todoApp } from './todoApp'
import { userApp } from './userApp'

export const server = createExpressServer({
  controllers: [],
  middlewares: [JsonMiddleware, AuthenticationMiddleware]
})

server.use('/users', userApp)
server.use('/todos', todoApp)
server.use('/session', sessionApp)
