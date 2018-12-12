const axiosist = require('axiosist')
const { server } = require('./server')
const { userRepository } = require('./repositories')

afterEach(() => {
  return userRepository.clear()
})

test('GET /users lists user and POST /users creates user', () => {
  return axiosist(server).get('/users')
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data).toEqual([])
      
      return axiosist(server).post('/users', { username: 'John' })
    })
    .then(response => {
      expect(response.status).toBe(200)
      const user = response.data
      expect(user.username).toBe('John')
      
      return axiosist(server).get('/users')
    })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.length).toBe(1)
      const user = response.data[0]
      expect(user.username).toBe('John')
    })
})

test('POST /session logs user in and DELETE /session logs user out', async () => {
  let response = await axiosist(server).post('/users', { username: 'John' })
  expect(response.status).toBe(200)
  const user = response.data

  try {
    await axiosist(server).get('/session')
  } catch(error) {
    expect(error.response.status).toBe(401)
    expect(error.response.data).toBe('Please login')
  }

  response = await axiosist(server).post('/session', { username: 'John' })
  expect(response.status).toBe(200)
  let session = response.data
  expect(session.userId).toBe(user.id)

  const headers = { authorization: session.id }

  response = await axiosist(server).get('/session', { headers })
  expect(response.status).toBe(200)
  session = response.data
  expect(session.userId).toBe(user.id)

  response = await axiosist(server).delete('/session', { headers })
  expect(response.status).toBe(200)

  try {
    await axiosist(server).get('/session')
  } catch(error) {
    expect(error.response.status).toBe(401)
    expect(error.response.data).toBe('Please login')
  }

  try {
    await axiosist(server).delete('/session')
  } catch(error) {
    expect(error.response.status).toBe(401)
    expect(error.response.data).toBe('Please login')
  }
})