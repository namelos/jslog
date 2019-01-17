import { Delete, Get, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers'
import { AuthorizationMiddleware } from '../middlewares/AuthorizationMiddleware'
import { sessionRepository, userRepository } from '../repositories'

@JsonController('/session')
export class SessionController {
  @Get('/')
  @UseBefore(AuthorizationMiddleware)
  async get(@Req() request) {
    return request['session']
  }

  @Post('/')
  async create(@Req() request, @Res() response) {
    const user = await userRepository.getByUsername(request.body.username)
    if (!user) return response.status(404).send('User not found')
    return await sessionRepository.insert(user.id)
  }

  @Delete('/')
  @UseBefore(AuthorizationMiddleware)
  async destroy(@Req() request) {
    await sessionRepository.delete(request['session'].userId)
    return request['session']
  }
}
