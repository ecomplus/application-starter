'use strict'

const { appInfo } = require('./../assets/app.js')

module.exports = (req, res) => {
  res.send(appInfo)
}
