'use strict'

const { baseUri, app } = require('./../__env')

// mocked app body
const baseApp = require('./../assets/app.json')

if (app) {
  // merge with app from Function config
  Object.assign(baseApp, app)
}
if (baseUri) {
  // replace `<base-uri>` mask to fix endpoints on app body
  const replaceBaseUri = mask => mask.replace(/<base-uri>/i, baseUri)
  baseApp.auth_callback_uri = replaceBaseUri(baseApp.auth_callback_uri)
  if (baseApp.modules && baseApp.modules.length > 0) {
    const modules = Object.keys(baseApp.modules)
    modules.forEach(modName => {
      baseApp.modules[modName].endpoint = replaceBaseUri(baseApp.modules[module].endpoint)
    })
  }
}

module.exports = (req, res) => {
  // showing app info on root route
  res.send(baseApp)
}
