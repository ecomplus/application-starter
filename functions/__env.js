// setup server and app options from Functions config (and mocks)
const { pkg, server } = require('firebase-functions').config()
const functionName = server.functionName || 'app'

module.exports = {
  functionName,
  operatorToken: server && server.operator_token,
  baseUri: (server && server.base_uri) ||
    `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/${functionName}`,
  pkg: {
    ...pkg
  }
}
