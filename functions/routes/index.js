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
        app.modules[modName].endpoint = `${baseUri}/ecom/modules/${modName.replace(/_/g, '-')}`
      }
    })
  }
}

// generate slug from package name or app title if not set or default
if (!app.slug || app.slug === 'my-awesome-app') {
  if (pkg.name && !pkg.name.endsWith('application-starter')) {
    app.slug = pkg.name.replace('/', '-').replace(/[^0-9a-z-]/ig, '')
  } else {
    // replace accents on title
    app.slug = app.title.toLowerCase()
      .replace(/[áâãà]/g, 'a')
      .replace(/[éê]/g, 'e')
      .replace(/[íî]/g, 'i')
      .replace(/[óôõ]/g, 'o')
      .replace(/[ú]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/-/g, '')
      .replace(/\s/g, '-')
      .replace(/[^0-9a-z-]/g, '')
  }
}

// set version same as root package
if (!app.version && pkg.version) {
  app.version = pkg.version.replace(/-.*/, '')
}

module.exports = (req, res) => {
  // showing app info on root route
  res.send(app)
}
