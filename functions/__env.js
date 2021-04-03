// setup server and app options from Functions config (and mocks)
const { GCLOUD_PROJECT } = process.env
const { pkg, server } = require('firebase-functions').config()
const functionName = server.functionName || 'app'

module.exports = {
  functionName,
  operatorToken: server && server.operator_token,
  baseUri: (server && server.base_uri) ||
    `https://us-central1-${GCLOUD_PROJECT}.cloudfunctions.net/${functionName}`,
  hostingUri: `https://${GCLOUD_PROJECT}.web.app`,
  pkg: {
    ...pkg
  }
}
