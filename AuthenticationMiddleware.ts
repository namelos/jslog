import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { sessionRepository } from './repositories'

@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  async use(request: any, response: any, next: (err?: any) => any) {
    request.sessionId = request.headers.authorization
    request.session = await sessionRepository.get(request.sessionId)
    next()
  }
}

