const express = require('express')
const { userRepository, sessionRepository } = require('./repositories')

const sessionApp = express.Router()

sessionApp.get('/', async (request, response) => {
  if (!request.sessionId) return response.status(401).send('Please login')
  if (!request.session) return response.status(404).send('Session not found')
  response.json(request.session)
})

sessionApp.post('/', async (request, response) => {
  const user = await userRepository.getByUsername(request.body.username)
  if (!user) return response.status(404).send('User not found')
  const session = await sessionRepository.insert(user.id)
  return response.json(session)
})

sessionApp.delete('/', async (request, response) => {
  if (!request.sessionId) return response.status(401).send('Please login')
  if (!request.session) return response.status(404).send('Session not found')
  await sessionRepository.delete(request.session.userId)
  return response.json(request.session)
})

module.exports = sessionApp
