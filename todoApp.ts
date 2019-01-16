import express from 'express'
import { todoRepository } from './repositories'
import { authorizationMiddleware } from './middlewares'

export const todoApp = express.Router()

todoApp.use(async (request, response, next) => {
  if (!request['sessionId']) return response.status(401).send('Please login')
  if (!request['session']) return response.status(404).send('Session not found')
  next()
})

todoApp.get('/', async (request, response) => {
  const todos = await todoRepository.allByUser(request['session'].userId)
  response.json(todos)
})

todoApp.post('/', async (request, response) => {
  const todo = await todoRepository.insert(Todo({
    content: request.body.content,
    userId: request['session'].userId
  }))

  return response.json(todo)
})

todoApp.put('/:id', async (request, response) => {
  let todo = await todoRepository.get(request.params.id)
  if (!todo) return response.status(404).send('Todo not found')
  todo.content = request.body.content
  todo.completed = request.body.completed
  todo = await todoRepository.update(todo)
  return response.json(todo)
})

function Todo({ content, userId }) {
  return { content, userId }
}

