import Bundler from 'parcel-bundler'
import { connectToDatabase, createServer } from './server'

async function run() {
  await connectToDatabase()
  const server = createServer()

  const bundler = new Bundler('./public/index.html')
  server.use(bundler.middleware())

  server.listen(3000, () => console.log('Listening...'))
}

run()
