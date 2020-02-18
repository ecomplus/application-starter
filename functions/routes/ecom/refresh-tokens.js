exports.post = ({ appSdk }, req, res) => {
  // we don't have to do nothing on this endpoint
  // update tokens service will be auto started by `appSdk` on setup:
  // https://github.com/ecomplus/application-sdk/blob/master/main.js#L65
  res.status(204).send()
}
