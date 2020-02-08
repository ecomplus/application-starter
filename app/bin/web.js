#!/usr/bin/env node

'use strict'

// log to files
const logger = require('console-files')
// handle app authentication to Store API
// https://github.com/ecomclub/ecomplus-app-sdk
const { ecomServerIps } = require('ecomplus-app-sdk')

// web server with Express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const port = process.env.PORT || 3000
const functions = require("firebase-functions")
const routes = './../routes'

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

router.get('/', require(`${routes}/`)())
router.post('/ecom/webhook', require(`${routes}/ecom/webhook`)())
router.post('/ecom/auth-callback', require(`${routes}/ecom/auth-callback`)())

app.use(router)

exports.widgets = functions.https.onRequest(app);