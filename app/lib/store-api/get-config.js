'use strict'

// handle Store API errors
const errorHandling = require('./error-handling')

module.exports = ({ appSdk, storeId, auth }, getHiddenData) => {
  // read configured options from app data
  // https://developers.e-com.plus/docs/api/#/store/applications/applications
  let apiRequest

  if (getHiddenData) {
    // send authenticated request to get full application document from Store API
    const subresource = null
    const method = 'GET'
    const data = {}

    apiRequest = appSdk.apiApp(storeId, subresource, method, data, auth)
  } else {
    // send non-authenticated request to get only the public app body
    apiRequest = appSdk.appPublicBody(storeId, auth)
  }

  // returns Store API request promise
  return apiRequest

    .then(({ response }) => {
      const { data } = response
      // setup returned config object
      let config = data.data || {}
      if (getHiddenData && typeof data.hidden_data === 'object' && data.hidden_data !== null) {
        Object.assign(config, data.hidden_data)
      }
      return config
    })

    .catch(err => {
      // cannot GET current application
      // debug error
      errorHandling(err)
      throw err
    })
}
