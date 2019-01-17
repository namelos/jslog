import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class AuthorizationMiddleware implements ExpressMiddlewareInterface {
  async use(request: any, response: any, next: (err?: any) => any) {
    if (!request.sessionId) return response.status(401).send('Please login')
    if (!request.session) return response.status(404).send('Session not found')
    next()
  }
}
