const sqlite = require('sqlite')

const dbPromise = sqlite.open(':memory:')
  .then(db => {
    return db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL
      )
    `)
    .then(() => {
      db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(255) NOT NULL,
        userId INTEGER NOT NULL
      )
      `)
    })
    .then(() => db)
  })
  .catch(console.log)

function all(...args) {
  return dbPromise.then(db => db.all(...args))
}

function get(...args) {
  return dbPromise.then(db => db.get(...args))
}

function run(...args) {
    return dbPromise.then(db => db.run(...args))
}

module.exports = {
  all,
  get,
  run
}  