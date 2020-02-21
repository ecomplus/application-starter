const { baseUri, pkg } = require('./../__env')

// configured base app body
const { app } = require('./../ecom.config')

if (baseUri) {
  // fix endpoints with current function URIs on app body
  if (!app.auth_callback_uri) {
    app.auth_callback_uri = `${baseUri}/ecom/auth-callback`
  }
  if (app.modules) {
    Object.keys(app.modules).forEach(modName => {
      if (app.modules[modName] && !app.modules[modName].endpoint) {
        app.modules[modName].endpoint = `${baseUri}/ecom/modules/${modName}`
      }
    })
  }
}

// set version and slug from root package
if (!app.version && pkg.version) {
  app.version = pkg.version.replace(/-.*/, '')
}
if (!app.slug && pkg.name) {
  app.slug = pkg.name.replace('/', '-').replace(/[^0-9a-z-]/ig, '')
}

module.exports = (req, res) => {
  // showing app info on root route
  res.send(app)
}
