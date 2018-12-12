const React = require('react')
const axios = require('axios')
const { SessionContext } = require('./contexts')
const { getHeaders } = require('../common')

function TodoApp() {
  const [todos, setTodos] = React.useState([])
  const [contentInput, setContentInput] = React.useState('')
  const session = React.useContext(SessionContext)

  React.useEffect(() => {
    fetchTodos()
  }, [])

  function fetchTodos() {
    return axios.get('/todos', getHeaders(session))
      .then(response => setTodos(response.data))
  }

  async function handleClick() {
    if (contentInput) {
      axios.post('/todos', { content: contentInput }, getHeaders(session))
        .then(fetchTodos)
      setContentInput('')
    }
  }

  return <div>
    <Todos todos={todos} fetchTodos={fetchTodos} />
    <input onChange={e => setContentInput(e.target.value)} value={contentInput}/>
    <button onClick={handleClick}>create todo</button>
  </div>
}

function Todos({ todos, fetchTodos }) {
  return <ul>
    {todos.map((todo, i) => <Todo {...todo} fetchTodos={fetchTodos} key={i} />)}
  </ul>
}

function Todo({ id, content, completed, fetchTodos }) {
  const session = React.useContext(SessionContext)

  async function handleChange() {
    await axios.put(`/todos/${id}`, {
      content,
      completed: !completed
    }, getHeaders(session))
    await fetchTodos()
  }

  return <div>
    <input type="checkbox" checked={completed} onChange={handleChange} />
    <span>{content}</span>
  </div>
}

module.exports = TodoApp