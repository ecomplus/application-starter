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
  .then(() => {
    return client.deploy({
      project,
      only: 'functions',
      token: FIREBASE_TOKEN,
      force: true
    }).then(() => {
      console.log(`Deployed with success to Firebase project '${project}'`)
      console.log(SERVER_BASE_URI || `https://us-central1-${project}.cloudfunctions.net/app/`)
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
