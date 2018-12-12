const React = require('react')
const axios = require('axios')
const { getHeaders } = require('../common')

function TodoApp({ session }) {
  const [todos, setTodos] = React.useState([])
  const [contentInput, setContentInput] = React.useState('')

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
    <Todos todos={todos} />
    <input onChange={e => setContentInput(e.target.value)} value={contentInput}/>
    <button onClick={handleClick}>create todo</button>
  </div>
}

function Todos({ todos }) {
  return <ul>
    {todos.map((todo, i) => <Todo {...todo} key={i} />)}
  </ul>
}

function Todo({ content, completed }) {
  return <div>
    <input type="checkbox" checked={completed} onChange={() => {}} />
    <span>{content}</span>
  </div>
}

module.exports = TodoApp