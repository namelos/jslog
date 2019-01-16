import express from 'express'
import { userRepository, sessionRepository } from './repositories'
import { authorizationMiddleware } from './middlewares'

export const sessionApp = express.Router()

sessionApp.post('/', async (request, response) => {
  const user = await userRepository.getByUsername(request.body.username)
  if (!user) return response.status(404).send('User not found')
  const session = await sessionRepository.insert(user.id)
  return response.json(session)
})

sessionApp.use(authorizationMiddleware)

sessionApp.get('/', async (request, response) => {
  response.json(request['session'])
})

sessionApp.delete('/', async (request, response) => {
  await sessionRepository.delete(request['session'].userId)
  return response.json(request['session'])
})

