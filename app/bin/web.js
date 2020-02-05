#!/usr/bin/env node

'use strict'

// log to files
const logger = require('console-files')
// handle app authentication to Store API
// https://github.com/ecomclub/ecomplus-app-sdk
const { ecomAuth, ecomServerIps } = require('ecomplus-app-sdk')

// web server with Express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  if (req.url.startsWith('/ecom/')) {
    // get E-Com Plus Store ID from request header
    req.storeId = parseInt(req.get('x-store-id'), 10)
    if (req.url.startsWith('/ecom/modules/')) {
      // request from Mods API
      // https://github.com/ecomclub/modules-api
      const { body } = req
      if (typeof body !== 'object' || body === null || !body.params || !body.application) {
        return res.status(406).send('Request not comming from Mods API? Invalid body')
      }
    }

    // on production check if request is comming from E-Com Plus servers
    if (process.env.NODE_ENV === 'production' && ecomServerIps.indexOf(req.get('x-real-ip')) === -1) {
      return res.status(403).send('Who are you? Unauthorized IP address')
    }
  }

  // pass to the endpoint handler
  // next Express middleware
  next()
})

ecomAuth.then(appSdk => {
  // setup app routes
  const routes = './../routes'
  router.get('/', require(`${routes}/`)())

  // base routes for E-Com Plus Store API
  ;[ 'auth-callback', 'webhook' ].forEach(endpoint => {
    let filename = `/ecom/${endpoint}`
    router.post(filename, require(`${routes}${filename}`)(appSdk))
  })

  /* Add custom app routes here */

  // add router and start web server
  app.use(router)
  app.listen(port)
  logger.log(`--> Starting web app on port :${port}`)
})

ecomAuth.catch(err => {
  logger.error(err)
  setTimeout(() => {
    // destroy Node process while Store API auth cannot be handled
    process.exit(1)
  }, 1100)
})
