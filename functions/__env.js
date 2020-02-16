'use strict'

// setup server and app options from Functions config (and mocks)
const { server, app } = require('firebase-functions').config()
const functionName = server.functionName || 'app'

module.exports = {
  functionName,
  operatorToken: server && server.operatorToken,
  baseUri: (server && server.baseUri) ||
    `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/${functionName}`,
  app: {
    title: 'No Named',
    ...app
  }
}
