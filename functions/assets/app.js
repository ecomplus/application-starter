const functions = require('firebase-functions')
const appBaseUrl = functions.config().app.base_uri

const appInfo = {
  'app_id': 9000,
  'state': 'active',
  'title': 'My Awesome E-Com Plus App',
  'slug': 'my-app',
  'version': '0.0.1',
  'type': 'external',
  'authentication': true,
  'auth_callback_uri': `${appBaseUrl}/ecom/auth-callback`,
  'auth_scope': {
    'procedures': [
      'POST'
    ]
  },
  'admin_settings': {
  }
}

module.exports = appInfo
