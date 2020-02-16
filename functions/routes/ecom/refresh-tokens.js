'use strict'

module.exports = ({ appSdk }, req, res) => {
  // we don't have to do nothing on this endpoint
  // update tokens service will be auto started by `appSdk` on setup:
  // https://github.com/ecomclub/ecomplus-app-sdk/blob/master/main.js#L69
  res.status(204).send()
}
