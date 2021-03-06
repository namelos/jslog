const React = require('react')
const axios = require('axios')

function Login({ setSessionId }) {
  const [nameInput, setNameInput] = React.useState('')

  async function handleClick() {
    if (nameInput) {
      const result = await axios.post('/session', { username: nameInput })
      const session = result.data
      setSessionId(session.id)
    }
  }

  return <div>
    username: <input value={nameInput} onChange={e => setNameInput(e.target.value)} />
    <button onClick={handleClick}>Login</button>
  </div>
}

module.exports = Login
