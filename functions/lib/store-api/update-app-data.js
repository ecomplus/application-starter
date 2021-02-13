// handle Store API errors
const errorHandling = require('./error-handling')

module.exports = ({ appSdk, storeId, auth }, data, isHiddenData = false) => {
  // edit configured options on app data
  // https://developers.e-com.plus/docs/api/#/store/applications/applications
  // returns Store API request promise
  return appSdk.apiApp(storeId, isHiddenData ? 'hidden_data' : 'data', 'PATCH', data, auth)
    .catch(err => {
      // cannot PATCH current application
      // debug error
      errorHandling(err)
      throw err
    })
}
