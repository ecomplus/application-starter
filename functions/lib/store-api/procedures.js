'use strict'

const functions = require('firebase-functions')
// APP hostname and base URL path
const appBaseUri = functions.config().app.base_uri
// APP name to procedures titles
const appName = functions.config().app.name

// exports array of procedures to be created on each store after app installation
// Procedure object reference:
// https://developers.e-com.plus/docs/api/#/store/procedures/
module.exports = [
  {
    title: appName,
    triggers: [
      /*
      Edit triggers here to fit the app necessities
      {
        resource: 'orders',
        action: 'create'
      },
      {
        resource: 'orders',
        action: 'change',
        field: 'financial_status'
      }
      */
    ],
    webhooks: [
      {
        api: {
          external_api: {
            uri: appBaseUri + '/ecom/webhook'
          }
        },
        method: 'POST'
      }
    ]
  }
]
