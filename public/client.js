const React = require('react')
const ReactDOM = require('react-dom')
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

ReactDOM.render(<p>hi</p>, document.querySelector('#root'))

window.api = api