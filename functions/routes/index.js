const { baseUri, app, pkg } = require('./../__env')

// mocked app body
const baseApp = require('./../ecom-app.json')

if (app) {
  // merge with app from Function config
  Object.assign(baseApp, app)
}

if (baseUri) {
  // fix endpoints with current function URIs on app body
  if (!baseApp.auth_callback_uri) {
    baseApp.auth_callback_uri = `${baseUri}/ecom/auth-callback`
  }
  if (baseApp.modules) {
    Object.keys(baseApp.modules).forEach(modName => {
      if (baseApp.modules[modName] && !baseApp.modules[modName].endpoint) {
        baseApp.modules[modName].endpoint = `${baseUri}/ecom/modules/${modName}`
      }
    })
  }
}

// set version and slug from root package
if (!baseApp.version && pkg.version) {
  baseApp.version = pkg.version.replace(/-.*/, '')
}
if (!baseApp.slug && pkg.name) {
  baseApp.slug = pkg.name.replace('/', '-').replace(/[^0-9a-z-]/ig, '')
}

module.exports = (req, res) => {
  // showing app info on root route
  res.send(baseApp)
}
