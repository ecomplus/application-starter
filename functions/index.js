#!/usr/bin/env node

'use strict'

// Firebase SDKs to setup cloud functions and access Firestore database
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const functionName = 'ecomApp'
admin.initializeApp()

// web server with Express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const routes = './routes'

// handle app authentication to Store API
// https://github.com/ecomclub/ecomplus-app-sdk
// disable set interval (no daemons on cloud functions)
process.env.ECOM_AUTH_UPDATE_INTERVAL = 'disabled'
const { ecomServerIps, setup } = require('ecomplus-app-sdk')

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
    const clientIp = req.get('x-forwarded-for') || req.connection.remoteAddress
    if (process.env.NODE_ENV === 'production' && ecomServerIps.indexOf(clientIp) === -1) {
      return res.status(403).send('Who are you? Unauthorized IP address')
    }
  }

  // pass to the endpoint handler
  // next Express middleware
  next()
})

router.get('/', require(`${routes}/`))

// setup ecomAuth client with Firestore instance
setup(null, true, admin.firestore()).then(appSdk => {
  // base routes for E-Com Plus Store API
  ;['auth-callback', 'webhook'].forEach(endpoint => {
    const filename = `/ecom/${endpoint}`
    router.post(filename, require(`${routes}${filename}`)({ appSdk, admin }))
  })
})

app.use(router)
exports[functionName] = functions.https.onRequest(app)
console.log(`Starting E-Com Plus app with Cloud Function '${functionName}'`)
