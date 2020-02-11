'use strict'

const baseApp = require('./../assets/app.json')

module.exports = (req, res) => {
  res.send(baseApp)
}
