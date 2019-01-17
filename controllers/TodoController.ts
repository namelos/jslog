import { Get, JsonController, Post, Put, Req, Res } from 'routing-controllers'
import { todoRepository } from '../repositories'

@JsonController('/todos')
export class TodoController {
  @Get('/')
  async getAll(@Req() request) {
    return await todoRepository.allByUser(request['session'].userId)
  }

  @Post('/')
  async create(@Req() request) {
    return await todoRepository.insert(new Todo({
      content: request.body.content,
      userId: request['session'].userId
    }))
  }

  @Put('/:id')
  async update(@Req() request, @Res() response) {
    let todo = await todoRepository.get(request.params.id)
    if (!todo) return response.status(404).send('Todo not found')
    todo.content = request.body.content
    todo.completed = request.body.completed
    return await todoRepository.update(todo)
  }
}

class Todo {
  content: string
  userId: number

  constructor({ content, userId }) {
    this.content = content
    this.userId = userId
  }
}
