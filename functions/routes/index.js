'use strict'

const baseApp = require('./../assets/app.json')
const functions = require('firebase-functions')
const appBaseUrl = functions.config().app.base_uri

if (appBaseUrl) {
  baseApp.auth_callback_uri = baseApp.auth_callback_uri.replace(/<base-uri>/i, appBaseUrl)
}

if (baseApp.modules && baseApp.modules.length > 0) {
  const modules = Object.keys(baseApp.modules)

  modules.forEach((module) => {
    baseApp.modules[module].endpoint = baseApp.modules[module].endpoint.replace(/<base-uri>/i, appBaseUrl)
  })
}

module.exports = (req, res) => {
  res.send(baseApp)
}
