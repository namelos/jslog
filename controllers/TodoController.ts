import { Get, JsonController, Post, Put, Req, Res } from 'routing-controllers'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Todo } from '../entities/Todo'
import { User } from '../entities/User'

@JsonController('/todos')
export class TodoController {
  @InjectRepository(User)
  userRepository: Repository<User>

  @InjectRepository(Todo)
  todoRepository: Repository<Todo>

  @Get('/')
  async getAll(@Req() request) {
    return await this.todoRepository.find({ user: request.user })
  }

  @Post('/')
  async create(@Req() request) {
    const todo = this.todoRepository.create({
      user: request.user,
      content: request.body.content,
      completed: request.body.completed || false
    })
    return await this.todoRepository.save(todo)
  }

  @Put('/:id')
  async update(@Req() request, @Res() response) {
    const todo = await this.todoRepository.findOne(request.params.id)
    if (!todo) return response.status(404).send('Todo not found')
    todo.content = request.body.content
    todo.completed = request.body.completed
    return await this.todoRepository.save(todo)
  }
}
