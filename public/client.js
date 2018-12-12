const React = require('react')
const ReactDOM = require('react-dom')
const UserApp = require('./UserApp')

function App() {
  return <div>
    <UserApp />
  </div>
}

ReactDOM.render(<App />, document.querySelector('#root'))