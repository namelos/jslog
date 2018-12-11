const sqlite = require('sqlite')

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
  userRepository
}