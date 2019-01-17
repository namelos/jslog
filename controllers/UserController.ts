import { Get, JsonController, Post, Req } from 'routing-controllers'
import { userRepository } from '../repositories'

@JsonController('/users')
export class UserController {
  @Get('/')
  async getAll() {
    return await userRepository.all()
  }

  @Post('/')
  async create(@Req() request) {
    const user = request.body
    return await userRepository.insert(user)
  }
}

class User {
  username: string

  constructor({ username }) {
    this.username = username
  }
}
