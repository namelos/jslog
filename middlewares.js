const { sessionRepository } = require('./repositories')

export async function authenticationMiddleware(request, response, next) {
  request.sessionId = request.headers.authorization
  request.session = await sessionRepository.get(request.sessionId)
  next()
}
