import express from 'express'
import { userRepository } from './repositories'

export const userApp = express.Router()

userApp.get('/', (request, response) => {
  return userRepository.all()
    .then(results => response.json(results))
})

userApp.post('/', (request, response) => {
  const user = User(request.body)
  return userRepository.insert(user)
    .then(x => response.json(x))
})

function User({ username }) {
  return { username }
}
