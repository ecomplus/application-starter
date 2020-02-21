require('dotenv').config()

const { name, version } = require('./package.json')

const {
  FIREBASE_TOKEN,
  FIREBASE_PROJECT_ID,
  SERVER_OPERATOR_TOKEN,
  SERVER_BASE_URI
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

client.functions.config.set(config, { project })
  .then(() => client.deploy({
    project,
    only: 'functions',
    token: FIREBASE_TOKEN,
    force: true
  }))

  .then(() => {
    console.log(
      '\x1b[32m%s\x1b[0m',
      `\nDeployed with success to Firebase project '${project}'`
    )
    console.log(
      '\x1b[35m%s\x1b[0m',
      `\nBase URI: ${(SERVER_BASE_URI || `https://us-central1-${project}.cloudfunctions.net/app/`)}`
    )
    console.log()
  })

  .catch(err => {
    console.error(err)
    process.exit(1)
  })
