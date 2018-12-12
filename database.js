const sqlite = require('sqlite')

async function getDBPromise() {
  try {
    const db = await sqlite.open(':memory:')
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL
      )
    `)
    await db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        userId INTEGER NOT NULL
      )
    `)
    await db.run(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content VARCHAR(255) NOT NULL,
        completed INTEGER DEFAULT 0,
        userId INTEGER NOT NULL
      )
    `)
    return db
  } catch(error) {
    console.log('Migration failed: ', error)
  }
}

const dbPromise = getDBPromise()

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