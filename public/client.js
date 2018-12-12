require('babel-polyfill')
const React = require('react')
const ReactDOM = require('react-dom')
const UserApp = require('./UserApp')
const Login = require('./Login')

function App() {
  return <div>
    <Login />
    <hr />
    <UserApp />
  </div>
}

ReactDOM.render(<App />, document.querySelector('#root'))