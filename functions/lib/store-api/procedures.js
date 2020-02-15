'use strict'

const { baseUri, app } = require('./../../__env')

// exports array of procedures to be created on each store after app installation
// Procedure object reference:
// https://developers.e-com.plus/docs/api/#/store/procedures/
module.exports = [
  {
    title: app.title,
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
            uri: baseUri + '/ecom/webhook'
          }
        },
        method: 'POST'
      }
    ]
  }
]
