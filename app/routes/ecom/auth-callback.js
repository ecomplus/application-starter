'use strict'

// log on files
const logger = require('console-files')
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
        if(isNew){
          appSdk.saveProcedures(storeId, procedures)
        }
        // authentication tokens were updated
        res.status(204)
        res.end()
      })

      .catch(err => {
        if (typeof err.code === 'string' && !err.code.startsWith('SQLITE_CONSTRAINT')) {
          // debug SQLite errors
          logger.error(err)
        }
        res.status(500)
        let { message } = err
        res.send({
          error: 'auth_callback_error',
          message
        })
      })
    })
    
    ecomAuth.catch(err => {
      logger.error(err)
      setTimeout(() => {
        process.exit(1)
      }, 1100)
    })
    
  }
}
