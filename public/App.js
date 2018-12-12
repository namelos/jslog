const React = require('react')
const { SessionContext } = require('./contexts')
const UserApp = require('./UserApp')
const Login = require('./Login')
const TodoApp = require('./TodoApp')

function App() {
  const [session, setSession] = React.useState([])

  return <SessionContext.Provider value={session}>
    {
      session && session.id ?
      <TodoApp /> :
      <Login setSession={setSession} />
    }
    <hr />
    <UserApp />
  </SessionContext.Provider>
}

module.exports = App