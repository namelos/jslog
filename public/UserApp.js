const React = require('react')
const axios = require('axios')

function UserApp() {
  const [users, setUsers] = React.useState([])
  const [nameInput, setNameInput] = React.useState('')

  React.useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers() {
    return axios.get('/users')
      .then(response => setUsers(response.data))
  }

  function handleCreateUserClick() {
    if (nameInput) {
      axios.post('/users', { username: nameInput }).then(fetchUsers)
      setNameInput('')
    }
  }

  return <div>
    <Users users={users} />
    <input onChange={e => setNameInput(e.target.value)} value={nameInput}/>
    <button onClick={handleCreateUserClick}>createUser</button>
  </div>
}

function Users({ users }) {
  return <ul>
    {users.map((user, i) => <User {...user} key={i} />)}
  </ul>
}

function User({ username }) {
  return <p>{username}</p>
}

module.exports = UserApp