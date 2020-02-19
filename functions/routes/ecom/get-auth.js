exports.get = ({ appSdk }, req, res) => {
  /* This endpoint MUST BE PRIVATE */
  // returning Store API authentication ID and access token for external usage
  appSdk.getAuth(req.storeId)
    .then(auth => {
      res.send(auth.row)
    })
    .catch(err => {
      const { message } = err
      console.error(err)
      res.status(500)
      res.send({
        error: 'get_token_err',
        message
      })
    })
}
