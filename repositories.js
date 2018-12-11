const database = require('./database')

const userRepository = {
  all: function() {
    return database.all(`SELECT * FROM users`)
  },
  get: function(id) {
    return database.get(`SELECT * FROM users where id = ?`, id)
  },
  insert: function(user) {
    return database.run(`INSERT INTO users (username) VALUES (?)`, user.username)
      .then(result => userRepository.get(result.stmt.lastID))
  },
  clear: function() {
    return database.run(`DELETE FROM users`)
  }
}

module.exports = {
  userRepository
}