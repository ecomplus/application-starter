#!/usr/bin/env node

'use strict'

const { functionName, operatorToken, app } = require('./__env')

// Firebase SDKs to setup cloud functions and access Firestore database
const admin = require('firebase-admin')
const functions = require('firebase-functions')
admin.initializeApp()

// web server with Express
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const router = express.Router()
const routes = './routes'

// handle app authentication to Store API
// https://github.com/ecomplus/application-sdk
const { ecomServerIps, setup } = require('@ecomplus/application-sdk')

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use((req, res, next) => {
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

    if (process.env.NODE_ENV !== 'development') {
      // check for operator token
      if (operatorToken !== req.get('x-operator-token')) {
        // last check for IP address from E-Com Plus servers
        const clientIp = req.get('x-forwarded-for') || req.connection.remoteAddress
        if (process.env.NODE_ENV !== 'development' && ecomServerIps.indexOf(clientIp) === -1) {
          return res.status(403).send('Who are you? Unauthorized IP address')
        }
      }
    }
  }

  // pass to the endpoint handler
  // next Express middleware
  next()
})

router.get('/', (req, res) => {
  server.set('json spaces', 2)
  require(`${routes}/`)(req, res)
})

// base routes for E-Com Plus Store API
;['auth-callback', 'refresh-tokens', 'webhook'].forEach(endpoint => {
  const filename = `/ecom/${endpoint}`
  router.post(filename, (req, res) => {
    // first disable set interval (no daemons on cloud functions)
    process.env.ECOM_AUTH_UPDATE_INTERVAL = 'disabled'
    process.env.ECOM_AUTH_DEBUG = 'true'

    // setup ecomAuth client with Firestore instance
    setup(null, true, admin.firestore()).then(appSdk => {
      require(`${routes}${filename}`)({ appSdk, admin }, req, res)
    }).catch(err => {
      console.error(err)
      res.status(500)
      res.send({
        error: 'SETUP',
        message: 'Can\'t setup `ecomAuth`, check Firebase console registers'
      })
    })
  })
})

server.use(router)
exports[functionName] = functions.https.onRequest(server)
console.log(`Starting '${app.title}' E-Com Plus app with Cloud Function '${functionName}'`)
