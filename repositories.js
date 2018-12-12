const uuid = require('uuid/v4')
const database = require('./database')

const userRepository = {
  async all() {
    return await database.all(`SELECT * FROM users`)
  },
  async get(id) {
    return await database.get(`
      SELECT * FROM users
      where id = ?
    `, id)
  },
  async getByUsername(username) {
    return await database.get(`
      SELECT * FROM users
      where username = ?
    `, username)
  },
  async insert(user) {
    const result = await database.run(`
      INSERT INTO users
        (username)
      VALUES (?)
    `, user.username)
    return await userRepository.get(result.stmt.lastID)
  },
  async clear() {
    return await database.run(`DELETE FROM users`)
  }
}

const sessionRepository = {
  async get(id) {
    return await database.get(`
      SELECT * FROM sessions
      where id = ?
    `, id)
  },
  async insert(userId) {
    const id = uuid()
    await database.run(`
      INSERT INTO sessions
        (id, userId)
      VALUES (?, ?)
    `, id, userId)
    return await sessionRepository.get(id)
  },
  async delete(userId) {
    return await database.run(`
      DELETE FROM sessions
      where userId = ?
    `, userId)
  },
  async clear() {
    return await database.run(`DELETE FROM sessions`)
  }
}

module.exports = {
  userRepository,
  sessionRepository
}