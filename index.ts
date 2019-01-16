import { server } from './server'
import Bundler from 'parcel-bundler'

const bundler = new Bundler('./public/index.html')
server.use(bundler.middleware())

server.listen(3000, () => console.log('Listening...'))
