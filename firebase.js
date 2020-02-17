const {
  FIREBASE_COMMAND,
  FIREBASE_TOKEN,
  FIREBASE_PROJECT_ID,
  APP_TITLE,
  SERVER_OPERATOR_TOKEN,
  SERVER_BASE_URI
} = process.env

if (!FIREBASE_TOKEN || !SERVER_OPERATOR_TOKEN) {
  const env = require('dotenv').config()
  if (env.error) {
    throw env.error
  }
}

let project = FIREBASE_PROJECT_ID
if (!project) {
  try {
    const firebaserc = require('./.firebaserc')
    project = firebaserc.projects.default
  } catch (e) {
    project = 'ecom-app'
  }
}

const client = require('firebase-tools')

const config = [
  `server.operatorToken="${SERVER_OPERATOR_TOKEN}"`
]
if (SERVER_BASE_URI) {
  config.push(`server.baseUri="${SERVER_BASE_URI}"`)
}
if (APP_TITLE) {
  config.push(`app.title="${APP_TITLE}"`)
}

client.functions.config.set(config)
  .then(() => {
    return client[FIREBASE_COMMAND || 'serve']({
      project,
      only: 'functions',
      token: FIREBASE_TOKEN,
      force: true
    }).then(() => {
      console.log(`Deployed with success to Firebase project '${project}'`)
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
