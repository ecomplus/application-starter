'use strict'

const baseApp = require('./../assets/app.json')
const functions = require('firebase-functions')
const appBaseUrl = functions.config().app.base_uri

baseApp.auth_callback_uri = baseApp.auth_callback_uri.replace(/<base-uri>/i, appBaseUrl)
module.exports = (req, res) => {
  res.send(baseApp)
}
