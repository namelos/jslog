const express = require('express')
const { 
  userRepository,
  sessionRepository,
  todoRepository
} = require('./repositories')

const server = express()
server.use(express.json())

server.get('/users', (request, response) => {
  return userRepository.all()
    .then(results => response.json(results))
})

server.post('/users', (request, response) => {
  const user = User(request.body)
  return userRepository.insert(user)
    .then(x => response.json(x))
})

server.get('/session', async (request, response) => {
  const sessionId = request.headers.authorization
  if (!sessionId) return response.status(401).send('Please login')
  const session = await sessionRepository.get(sessionId)
  if (!session) return response.status(404).send('Session not found')
  response.json(session)
})

server.post('/session', async (request, response) => {
  const user = await userRepository.getByUsername(request.body.username)
  if (!user) return response.status(404).send('User not found')
  const session = await sessionRepository.insert(user.id)
  return response.json(session)
})

server.delete('/session', async (request, response) => {
  const sessionId = request.headers.authorization
  if (!sessionId) return response.status(401).send('Please login')
  const session = await sessionRepository.get(request.headers.authorization)
  await sessionRepository.delete(session.userId)
  return response.json(session)
})

server.get('/todos', async (request, response) => {
  const sessionId = request.headers.authorization
  if (!sessionId) return response.status(401).send('Please login')
  const session = await sessionRepository.get(sessionId)
  if (!session) return response.status(404).send('Session not found')
  
  const todos = await todoRepository.allByUser(session.userId)
  response.json(todos)
})

server.post('/todos', async (request, response) => {
  const sessionId = request.headers.authorization
  if (!sessionId) return response.status(401).send('Please login')
  const session = await sessionRepository.get(sessionId)
  if (!session) return response.status(404).send('Session not found')

  const todo = await todoRepository.insert(Todo({
    content: request.body.content,
    userId: session.userId
  }))
  
  return response.json(todo)
})

server.put('/todos/:id', async (request, response) => {
  const sessionId = request.headers.authorization
  if (!sessionId) return response.status(401).send('Please login')
  const session = await sessionRepository.get(sessionId)
  if (!session) return response.status(404).send('Session not found')

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

function User(params) {
  return { username: params.username }
}

module.exports = {
  server
}