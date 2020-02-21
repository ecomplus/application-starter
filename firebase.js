require('dotenv').config()

const { name, version } = require('./package.json')

const {
  FIREBASE_COMMAND,
  FIREBASE_TOKEN,
  FIREBASE_PROJECT_ID,
  SERVER_OPERATOR_TOKEN,
  SERVER_BASE_URI,
  APP_ID,
  APP_TITLE
} = process.env

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
  `pkg.version=${version}`,
  `pkg.name=${name}`,
  `server.operator_token=${SERVER_OPERATOR_TOKEN}`
]
if (SERVER_BASE_URI) {
  config.push(`server.base_uri=${SERVER_BASE_URI}`)
}
if (APP_ID) {
  config.push(`app.app_id=${APP_ID}`)
}
if (APP_TITLE) {
  config.push(`app.title=${APP_TITLE}`)
}

client.functions.config.set(config, { project })
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
