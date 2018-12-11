const axiosist = require('axiosist')
const server = require('./server')

test('/hello returns hello', () => {
  return axiosist(server).get('/hello')
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data).toBe('hello')
    })
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