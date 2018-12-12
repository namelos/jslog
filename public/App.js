const React = require('react')
const UserApp = require('./UserApp')
const Login = require('./Login')
const TodoApp = require('./TodoApp')

function App() {
  const [session, setSession] = React.useState([])

  return <div>
    {
      session && session.id ?
      <TodoApp session={session} /> :
      <Login setSession={setSession} />
    }
    <hr />
    <UserApp />
  </div>
}

module.exports = App