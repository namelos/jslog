import { Delete, Get, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Session } from '../entities/Session'
import { User } from '../entities/User'
import { AuthorizationMiddleware } from '../middlewares/AuthorizationMiddleware'

@JsonController('/session')
export class SessionController {
  @InjectRepository(Session)
  sessionRepository: Repository<Session>

  @InjectRepository(User)
  userRepository: Repository<User>

  @Get('/')
  @UseBefore(AuthorizationMiddleware)
  async get(@Req() request) {
    return await this.sessionRepository.findOne(request.session.id)
  }

  @Post('/')
  async create(@Req() request, @Res() response) {
    const user = await this.userRepository.findOne({ username: request.body.username })
    if (!user) return response.status(404).send('User not found')
    const session = this.sessionRepository.create({ user })
    return await this.sessionRepository.save(session)
  }

  @Delete('/')
  @UseBefore(AuthorizationMiddleware)
  async destroy(@Req() request) {
    return await this.sessionRepository.delete(request.session)
  }
}
