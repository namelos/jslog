const { sessionRepository } = require('./repositories')

async function authenticationMiddleware(request, response, next) {
  request.sessionId = request.headers.authorization
  request.session = await sessionRepository.get(request.sessionId)
  next()
}

async function authorizationMiddleware(request, response, next) {
  if (!request.sessionId) return response.status(401).send('Please login')
  if (!request.session) return response.status(404).send('Session not found')
  next()
}

module.exports = {
  authenticationMiddleware,
  authorizationMiddleware
}
