'use strict'

const { ecomAuth } = require('ecomplus-app-sdk')
module.exports = () => {
  return (req, res) => {
    const { storeId } = req
    const procedures = require('./../../lib/store-api/procedures')
    // handle callback with E-Com Plus app SDK
    // https://github.com/ecomclub/ecomplus-app-sdk
    ecomAuth.then(appSdk => {
      appSdk.handleCallback(storeId, req.body)
        .then(({ isNew, authenticationId }) => {
          if (isNew) {
            appSdk.saveProcedures(storeId, procedures)
          }
          // authentication tokens were updated
          res.status(204)
          res.end()
        })

        .catch(err => {
          console.error(err)
          res.status(500)
          const { message } = err
          res.send({
            error: 'auth_callback_error',
            message
          })
        })
    })
  }
}
