const axiosist = require('axiosist')
const server = require('./server')

test('/hello returns hello', () => 
  axiosist(server).get('/hello')
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data).toBe('hello')
    })
)