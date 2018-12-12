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

const todoRepository = {
  async all() {
    const todos = await database.all(`SELECT * FROM todos`)
    return todos.map(todoFromDB)
  },
  async allByUser(userId) {
    const todos = await database.all(`
      SELECT * FROM todos
      where userId = ?
    `, userId)
    return todos.map(todoFromDB)
  },
  async get(id) {
    const todo = await database.get(`
      SELECT * FROM todos
      where id = ?
    `, id)
    return todoFromDB(todo)
  },
  async insert(todo) {
    const result = await database.run(`
      INSERT INTO todos
        (content, userId)
      VALUES (?, ?)
    `, todo.content, todo.userId)
    return await todoRepository.get(result.stmt.lastID)
  },
  async clear() {
    return await database.run(`DELETE FROM todos`)
  }
}

function todoFromDB(todo) {
  if (!todo) return todo
  if (todo.completed === 1) todo.completed = true
  else todo.completed = false
  return todo
}

module.exports = {
  userRepository,
  sessionRepository,
  todoRepository
}