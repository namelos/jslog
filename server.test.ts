import axiosist from 'axiosist'
import { Connection } from 'typeorm'
import { connectToDatabase, createServer, } from './server'

function getHeaders(session) {
  return {
    headers: { authorization: session.id }
  }
}

let connection: Connection
let server

beforeAll(async () => {
  connection = await connectToDatabase()
  server = createServer()
})

beforeEach(async () => {
  await connection.dropDatabase()
  await connection.synchronize()
})

afterAll(async () => {
  await connection.close()
})

test('GET /users lists user and POST /users creates user', async () => {
  let response = await axiosist(server).get('/users')

  expect(response.status).toBe(200)
  expect(response.data).toEqual([])

  response = await axiosist(server).post('/users', { username: 'John' })

  expect(response.status).toBe(200)
  let user = response.data
  expect(user.username).toBe('John')

  response = await axiosist(server).get('/users')

  expect(response.status).toBe(200)
  expect(response.data.length).toBe(1)
  user = response.data[0]
  expect(user.username).toBe('John')
})

test('POST /session logs user in and DELETE /session logs user out', async () => {
  const user = await createUser('John')

  try {
    await axiosist(server).get('/session')
  } catch (error) {
    expect(error.response.status).toBe(401)
    expect(error.response.data).toBe('Please login')
  }

  let response = await axiosist(server).post('/session', { username: 'John' })
  expect(response.status).toBe(200)
  let session = response.data
  expect(session.user.id).toBe(user.id)

  response = await axiosist(server).get('/session', getHeaders(session))
  expect(response.status).toBe(200)
  session = response.data
  expect(session.user.id).toBe(user.id)

  response = await axiosist(server).delete('/session', getHeaders(session))
  expect(response.status).toBe(200)

  try {
    await axiosist(server).get('/session')
  } catch (error) {
    expect(error.response.status).toBe(401)
    expect(error.response.data).toBe('Please login')
  }

  try {
    await axiosist(server).delete('/session')
  } catch (error) {
    expect(error.response.status).toBe(401)
    expect(error.response.data).toBe('Please login')
  }
})

test('POST /todos creates todo while GET /todos lists todo for user', async () => {
  const user = await createUser('John')
  const session = await loginUser(user)

  let response = await axiosist(server).get('/todos', getHeaders(session))
  expect(response.status).toBe(200)
  let todos = response.data
  expect(todos.length).toBe(0)

  const content = 'Learn Node.js'
  response = await axiosist(server).post('/todos', { content }, getHeaders(session))
  expect(response.status).toBe(200)
  const todo = response.data
  expect(todo.content).toBe(content)
  expect(todo.completed).toBe(false)

  response = await axiosist(server).get('/todos', getHeaders(session))
  expect(response.status).toBe(200)
  todos = response.data
  expect(todos.length).toBe(1)
  expect(todos[0].content).toBe(todo.content)
  expect(todos[0].completed).toBe(todo.completed)
  expect(todos[0].id).toBe(todo.id)
})

test('GET /todos must not return todos from other users', async () => {
  const john = await createUser('John')
  const johnSession = await loginUser(john)

  const jane = await createUser('Jane')
  const janeSession = await loginUser(jane)

  const todoFromJohn = await createTodo('Learn Node.js', johnSession)
  await createTodo('Learn React.js', janeSession)

  let response = await axiosist(server).get('/todos', getHeaders(johnSession))
  expect(response.status).toBe(200)
  let todos = response.data
  expect(todos.length).toBe(1)
  expect(todos[0].content).toBe(todoFromJohn.content)
  expect(todos[0].completed).toBe(todoFromJohn.completed)
  expect(todos[0].id).toBe(todoFromJohn.id)
})

async function createTodo(content, session) {
  let response = await axiosist(server).post('/todos', { content }, getHeaders(session))
  expect(response.status).toBe(200)
  const todo = response.data
  expect(todo.content).toBe(content)
  expect(todo.completed).toBe(false)
  return todo
}

test('PUT /todos/:id updates the todo', async () => {
  const user = await createUser('John')
  const session = await loginUser(user)
  const todo = await createTodo('Learn Node.js', session)

  let response = await axiosist(server).get('/todos', getHeaders(session))
  expect(response.status).toBe(200)
  let todos = response.data
  expect(todos.length).toBe(1)
  expect(todos[0].content).toBe('Learn Node.js')
  expect(todos[0].completed).toBe(false)

  response = await axiosist(server).put(`/todos/${todo.id}`, {
    content: 'Learn React.js',
    completed: true
  }, getHeaders(session))
  expect(response.status).toBe(200)

  response = await axiosist(server).get('/todos', getHeaders(session))
  expect(response.status).toBe(200)
  todos = response.data
  expect(todos.length).toBe(1)
  expect(todos[0].content).toBe('Learn React.js')
  expect(todos[0].completed).toBe(true)
})

async function loginUser(user) {
  let response = await axiosist(server).post('/session', { username: user.username })
  expect(response.status).toBe(200)
  let session = response.data
  expect(session.user.id).toBe(user.id)
  return session
}

async function createUser(username) {
  let response = await axiosist(server).post('/users', { username })
  expect(response.status).toBe(200)
  return response.data
}
