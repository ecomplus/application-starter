'use strict'

// E-Com Plus Procedures to register
const procedures = require('./../../lib/store-api/procedures')

module.exports = ({ appSdk }) => (req, res) => {
  const { storeId } = req

  // handle callback with E-Com Plus app SDK
  // https://github.com/ecomclub/ecomplus-app-sdk
  appSdk.handleCallback(storeId, req.body)
    .then(({ isNew, authenticationId, settedUp }) => {
      if (!isNew && !settedUp) {
        appSdk.getAuth(storeId, authenticationId).then(auth => {
          appSdk.saveProcedures(storeId, procedures).then(() => {
            if (auth.doc) {
              auth.doc(authenticationId).set({ setted_up: true }, { merge: true })
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
          })
        })
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
}
