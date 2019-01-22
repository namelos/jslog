import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Session } from '../entities/Session'

@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  @InjectRepository(Session)
  sessionRepository: Repository<Session>

  async use(request: any, response: any, next: (err?: any) => any) {
    request.sessionId = request.headers.authorization
    request.session = await this.sessionRepository.findOne(request.sessionId)
    if (request.session) request.user = request.session.user
    next()
  }
}

