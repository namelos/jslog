const { server } = require('./server')
const Bundler = require('parcel-bundler')

const bundler = new Bundler('./public/index.html')
server.use(bundler.middleware())

server.listen(3000, () => console.log('Listening...'))