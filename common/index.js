function getHeaders(session) {
  return {
    headers: { authorization: session.id }
  }
}

module.exports = {
  getHeaders
}