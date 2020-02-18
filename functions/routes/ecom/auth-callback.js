'use strict'

// E-Com Plus Procedures to register
const procedures = require('./../../lib/store-api/procedures')
// handle Store API errors
const errorHandling = require('./../../lib/store-api/error-handling')

exports.post = ({ appSdk }, req, res) => {
  const { storeId } = req

  // handle callback with E-Com Plus app SDK
  // https://github.com/ecomplus/application-sdk
  appSdk.handleCallback(storeId, req.body)
    .then(({ isNew, authenticationId }) => {
      if (isNew) {
        console.log(`Installing store #${storeId}`)
      } else if (procedures && procedures.length) {
        const { triggers } = procedures[0]
        if (triggers && triggers.length) {
          return appSdk.getAuth(storeId, authenticationId).then(auth => {
            const { row, docRef } = auth
            if (!row.settep_up) {
              console.log(`Try saving procedures for store #${storeId}`)
              // must save procedures once
              return appSdk.saveProcedures(storeId, procedures, auth)
                .then(() => docRef.set({ setted_up: true }, { merge: true }))
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
      const { message, response } = err
      if (response) {
        errorHandling(err)
      } else {
        // Firestore error ?
        console.error(err)
      }
      res.status(500)
      res.send({
        error: 'auth_callback_error',
        message
      })
    })
}
