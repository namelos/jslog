const React = require('react')
const Enzyme = require('enzyme')
const { shallow } = Enzyme
const Adapter = require('enzyme-adapter-react-16')
const Hello = require('./Hello')

Enzyme.configure({ adapter: new Adapter() })

test('<Hello />', () => {
  expect(
    shallow(<Hello />).equals(<p>hello</p>)
  ).toBe(true)
})