const React = require('react')
const ReactDOM = require('react-dom')
const axios = require('axios')

const api = {
  getUsers: function() {
    return axios.get('/users')
      .then(response => response.data)
  },
  createUser: function(username) {
    return axios.post('/users', { username: username })
      .then(response => response.data)
  }
}

function App() {
  const [users, setUsers] = React.useState([])
  const [nameInput, setNameInput] = React.useState('')

  React.useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers() {
    return api.getUsers()
      .then(us => setUsers(us))
  }

  function handleCreateUserClick() {
    if (nameInput) {
      api.createUser(nameInput).then(fetchUsers)
      setNameInput('')
    }
  }

  return <div>
    <ul>
      {users.map((user, i) => <User {...user} key={i} />)}
    </ul>
    <input onChange={e => setNameInput(e.target.value)} value={nameInput}/>
    <button onClick={handleCreateUserClick}>createUser</button>
  </div>
}

function User({ username }) {
  return <p>{username}</p>
}

ReactDOM.render(<App />, document.querySelector('#root'))