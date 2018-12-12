const uuid = require('uuid/v4')
const database = require('./database')

const userRepository = {
  all: function() {
    return database.all(`
      SELECT *
      FROM users
    `)
  },
  get: function(id) {
    return database.get(`
      SELECT *
      FROM users
      where id = ?
    `, id)
  },
  getByUsername: function(username) {
    return database.get(`
      SELECT *
      FROM users
      where username = ?
    `, username)
  },
  insert: function(user) {
    return database.run(`
      INSERT INTO
        users (username)
      VALUES (?)
    `, user.username)
      .then(result => userRepository.get(result.stmt.lastID))
  },
  clear: function() {
    return database.run(`
      DELETE FROM users
    `)
  }
}

const sessionRepository = {
  get: function(id) {
    return database.get(`
      SELECT *
      FROM sessions
      where id = ?
    `, id)
  },
  insert: function(userId) {
    const id = uuid()
    return database.run(`
      INSERT INTO
        sessions (id, userId)
      VALUES (?, ?)
    `, id, userId)
      .then(() => sessionRepository.get(id))
  },
  delete: function(userId) {
    return database.run(`
      DELETE FROM sessions
      where userId = ?
    `, userId)
  }
}

module.exports = {
  userRepository,
  sessionRepository
}