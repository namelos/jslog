const axios = require('axios')

const api = {
  getUsers: function() {
    return axios.get('/users')
  },
  createUser: function(username) {
    return axios.post('/users', { username: username })
  },
  createAndGetUsers: function(username) {
    return api.createUser(username)
      .then(() => api.getUsers())
  }
}

window.api = api