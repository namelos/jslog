const React = require('react')
const { SessionContext } = require('./contexts')
const UserApp = require('./UserApp')
const Login = require('./Login')
const TodoApp = require('./TodoApp')

function App() {
  const [sessionId, setSessionId] = React.useState(null)

  return <SessionContext.Provider value={sessionId}>
    {
      sessionId ?
      <TodoApp /> :
      <Login setSessionId={setSessionId} />
    }
    <hr />
    <UserApp />
  </SessionContext.Provider>
}

module.exports = App
