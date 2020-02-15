'use strict'

// E-Com Plus Procedures to register
const procedures = require('./../../lib/store-api/procedures')

module.exports = ({ appSdk }) => (req, res) => {
  const { storeId } = req

  // handle callback with E-Com Plus app SDK
  // https://github.com/ecomclub/ecomplus-app-sdk
  appSdk.handleCallback(storeId, req.body)
    .then(({ isNew, authenticationId }) => {
      if (!isNew && procedures && procedures.length) {
        const { triggers } = procedures[0]
        if (triggers && triggers.length) {
          return appSdk.getAuth(storeId, authenticationId).then(auth => {
            const { row, docRef } = auth
            if (!row.settep_up) {
              // must save procedures once
              return appSdk.saveProcedures(storeId, procedures, auth)
                .then(() => docRef(authenticationId).set({ setted_up: true }, { merge: true }))
            }
          })
        }
      }
    })
        
    .then(() => {
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
}
