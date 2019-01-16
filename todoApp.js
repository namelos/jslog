const express = require('express')
const { todoRepository } = require('./repositories')

const todoApp = express.Router()

todoApp.use(async (request, response, next) => {
  if (!request.sessionId) return response.status(401).send('Please login')
  if (!request.session) return response.status(404).send('Session not found')
  next()
})

todoApp.get('/', async (request, response) => {
  if (!request.sessionId) return response.status(401).send('Please login')
  if (!request.session) return response.status(404).send('Session not found')

  const todos = await todoRepository.allByUser(request.session.userId)
  response.json(todos)
})

todoApp.post('/', async (request, response) => {
  if (!request.sessionId) return response.status(401).send('Please login')
  if (!request.session) return response.status(404).send('Session not found')

  const todo = await todoRepository.insert(Todo({
    content: request.body.content,
    userId: request.session.userId
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

module.exports = todoApp