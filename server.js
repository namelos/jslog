const express = require('express')
const sqlite = require('sqlite')

const server = express()
server.use(express.json())

const dbPromise = sqlite.open(':memory:')
  .then(db => {
    return db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL
      )
    `)
    .then(() => db)
  })
  .catch(console.log)

server.get('/users', (request, response) => {
  return userRepository.all()
    .then(results => response.json(results))
})

server.post('/users', (request, response) => {
  const user = User(request.body)
  return userRepository.insert(user)
    .then(x => response.json(x))
})

function User(params) {
  return { username: params.username }
}

const userRepository = {
  all: function() {
    return dbPromise
      .then(db => db.all(`SELECT * FROM users`))
  },
  get: function(id) {
    return dbPromise
      .then(db => db.get(`SELECT * FROM users where id = ?`, id))
  },
  insert: function(user) {
    return dbPromise
      .then(db => db.run(`INSERT INTO users (username) VALUES (?)`, user.username))
      .then(result => userRepository.get(result.stmt.lastID))
  },
  clear: function() {
    return dbPromise
      .then(db => db.run(`DELETE FROM users`))
  }
}

module.exports = {
  server,
  userRepository
}