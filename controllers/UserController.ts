import { Get, JsonController, Post, Req } from 'routing-controllers'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '../entities/User'

@JsonController('/users')
export class UserController {
  @InjectRepository(User)
  userRepository: Repository<User>

  @Get('/')
  async getAll() {
    return this.userRepository.find()
  }

  @Post('/')
  async create(@Req() request) {
    const user = new User()
    user.username = request.body.username
    return await this.userRepository.save(user)
  }
}
