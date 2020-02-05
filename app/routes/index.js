'use strict'

// read app package.json
const pkg = require('./../package.json')

module.exports = () => {
  // show package info on domain root
  return (req, res) => res.send(pkg)
}
